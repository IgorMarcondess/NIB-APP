import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/input';
import { registrarUser } from '../services/firebase';
import { useUser } from "../components/userContext";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 números"),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  telefone: z.string().regex(/^\d{11}$/, "Telefone deve conter 11 números"),
});

type FormData = z.infer<typeof schema>;

export default function CadastroPrincipal() {
  const { setUser } = useUser();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const usuario = {
        ...data,
        nome: `${data.nome}`,
        plano: "",
        userId: ""
      };

      const userData = await registrarUser(usuario);
      //setUser(userData);
      router.navigate("./cadastro-secundario");

    } catch (error: any) {
      const msg = error.message === "E-mail já cadastrado." 
        ? "Este e-mail já está cadastrado." 
        : error.message || "Erro ao registrar o usuário";
      Alert.alert("Erro", msg);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#003EA6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-4 pb-10">
          <Image source={require('../assets/logoteeth.png')} className="w-40 mb-5" />
          <Text className="text-white text-2xl font-bold mb-2">INSERIR DADOS</Text>
          <Image source={require('../assets/image1.png')} className="w-[300px] h-[200px] rounded-xl" />

          {/* CPF */}
          <Text className="text-white text-lg font-bold mt-2">CPF</Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu CPF"
                imagem={<Feather name="mail" size={20} color="blue" />}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cpf && <Text className="text-red-500 text-xs mb-1">{errors.cpf.message}</Text>}

          {/* Nome */}
          <Text className="text-white text-lg font-bold mt-2">Nome</Text>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu Nome"
                imagem={<Feather name="user" size={20} color="blue" />}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.nome && <Text className="text-red-500 text-xs mb-1">{errors.nome.message}</Text>}

          {/* Email */}
          <Text className="text-white text-lg font-bold mt-2">E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu E-mail"
                imagem={<Feather name="mail" size={20} color="blue" />}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-xs mb-1">{errors.email.message}</Text>}

          {/* Senha */}
          <Text className="text-white text-lg font-bold mt-2">Senha</Text>
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, value } }) => (
              <Input
                text="Digite sua Senha"
                imagem={<Feather name="lock" size={20} color="blue" />}
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.senha && <Text className="text-red-500 text-xs mb-1">{errors.senha.message}</Text>}

          {/* Telefone */}
          <Text className="text-white text-lg font-bold mt-2">Telefone</Text>
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu Telefone"
                imagem={<Feather name="phone" size={20} color="blue" />}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.telefone && <Text className="text-red-500 text-xs mb-1">{errors.telefone.message}</Text>}

          {/* Botões */}
          <View className="flex-row justify-center items-center gap-5 mt-10">
            <TouchableOpacity className="py-3 px-8 rounded-full border-2 border-white" onPress={() => router.back()}>
              <Text className="text-white text-lg font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit(onSubmit)} className="py-3 px-8 rounded-full border-2 border-white">
              <Text className="text-white text-lg font-bold">REGISTRAR - SE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
