import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../../components/input';
import { registrarUser } from '../../services/firebase';
import { useUser } from "../../components/userContext";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import postCriarUsuario from '../../services/postCriarUsuario';

function formatarData(data: string): string {
  if (!/^\d{8}$/.test(data)) throw new Error("Data inválida. Use o formato ddMMyyyy.");
  const dia = data.substring(0, 2);
  const mes = data.substring(2, 4);
  const ano = data.substring(4, 8);
  return `${ano}-${mes}-${dia}`;
}

const schema = z.object({
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 números"),
});

type FormData = z.infer<typeof schema>;

export default function Localizar_cpf() {
  const { setUser } = useUser();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const usuario = {
        cpf: data.cpf,
      };


    } catch (error: any) {
      const msg = error.message === "E-mail já cadastrado." ? "Este e-mail já está cadastrado." : error.message || "Erro ao registrar o usuário.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#003EA6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-4 pb-10">
          <Image source={require('../../assets/logoteeth.png')} className="w-40 mb-5" />
          <Text className="text-white text-2xl font-bold mb-2">INSERIR DADOS</Text>
          <Image source={require('../../assets/image1.png')} className="w-[300px] h-[200px] rounded-xl" />

          <Text className="text-white text-lg font-bold mt-2">CPF</Text>
          <Controller control={control} name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input text="Digite seu CPF" imagem={<Feather name="mail" size={20} color="blue" />} keyboardType="numeric" value={value} onChangeText={onChange} />
            )}
          />
          {errors.cpf && <Text className="text-red-500 text-xs mb-1">{errors.cpf.message}</Text>}

          <View className="flex-row justify-center items-center gap-5 mt-10">
            <TouchableOpacity className="py-3 px-8 rounded-full border-2 border-white" onPress={() => router.back()}>
              <Text className="text-white text-lg font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="py-3 px-8 rounded-full border-2 border-white flex-row items-center"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />) : (<Text className="text-white text-lg font-bold">REGISTRAR - SE</Text>)}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
