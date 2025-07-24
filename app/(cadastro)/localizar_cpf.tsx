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
    try {
      setLoading(true);

      const response = await fetch('https://sua-api.com/usuario/buscar-cpf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf: data.cpf }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Erro ao buscar usuário.');
      }

      // Exemplo de resposta esperada:
      // { usuarioEncontrado: true, nome: "Maria", ... }

      if (json.usuarioEncontrado) {
        setUser(json); // armazena no contexto global se necessário
        router.push('/cadastro_confirmado'); // redireciona para próxima etapa
      } else {
        Alert.alert('CPF não encontrado', 'Nenhum cadastro foi localizado com esse CPF.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro inesperado.');
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
