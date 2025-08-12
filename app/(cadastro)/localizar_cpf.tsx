import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/input';
import { useUser } from '../../components/userContext';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

const schema = z.object({
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 números'),
});

type FormData = z.infer<typeof schema>;

export default function Localizar_cpf() {
  const { setUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // 🔍 Busca no Firebase
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('cpf', '==', data.cpf));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('CPF não encontrado no Firebase', 'Nenhum cadastro foi localizado no banco interno.');
        return;
      }

      const firebaseDoc = querySnapshot.docs[0];
      const firebaseData = firebaseDoc.data();

      // 🔍 Busca na API
      const response = await axios.get(`http://192.168.15.10:8080/usuario/cpf/${data.cpf}`);

      if (!response.data) {
        Alert.alert('CPF não encontrado na API', 'O cadastro não foi localizado na base externa.');
        return;
      }

      const dados = Array.isArray(response.data) ? response.data[0] : response.data;

      // ✅ CPF encontrado nas duas fontes
      const userFinal = {
        cpfUser: dados.cpf || firebaseData.cpf || '',
        nomeUser: dados.nome || firebaseData.nome || '',
        sobrenomeUser: dados.sobrenome || firebaseData.sobrenome || '',
        telefoneUser: dados.telefone || firebaseData.telefone || '',
        dataNascimentoUser: dados.dataNascimento || firebaseData.dataNascimento || '',
        planoUser: dados.plano || firebaseData.plano || '',
        emailUser: dados.email || firebaseData.email || '',
        idUser: firebaseDoc.id,
      };

      setUser(userFinal);
      Alert.alert('Usuário encontrado', 'Seguindo para próxima tela...');
      router.push('/primeiro-cadastro');
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.message || error.message || 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#003EA6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-4 pb-10">
          <Image source={require('../../assets/logoteeth.png')} className="w-40 mb-5" />
          <Text className="text-white text-2xl font-bold mb-2 mt-6">LOCALIZAR CADASTRO</Text>

          <Text className="text-white text-lg font-medium mt-2 mb-2">DIGITE SEU CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                text="(Sem pontuação)"
                imagem={<Feather name="user" size={20} color="blue" />}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cpf && <Text className="text-red-500 text-xs mb-1">{errors.cpf.message}</Text>}

          <Image
            source={require('../../assets/recepcao.jpg')}
            className="w-[350px] h-[300px] rounded-xl mt-10"
          />

          <View className="flex-row justify-center items-center gap-5 mt-10">
            <TouchableOpacity
              className="py-3 px-8 rounded-full border-2 border-white"
              onPress={() => router.back()}
            >
              <Text className="text-white text-lg font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="py-3 px-8 rounded-full border-2 border-white flex-row items-center"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">AVANÇAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
