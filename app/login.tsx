import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";
import { useUser } from "../components/userContext";
import { loginUser } from "../services/firebase";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageBackground } from "react-native";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();

  const {control, handleSubmit, formState: { errors },} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const Login = async (data: FormData): Promise<void> => {
    try {
      const userData = await loginUser(data.email, data.senha);
      setUser(userData);
      Alert.alert("Login realizado com sucesso!");
      await AsyncStorage.setItem(data.email, JSON.stringify({ nome: userData.nomeUser }));
      router.push("./initial");
    } catch (error) {
      Alert.alert("Erro", error instanceof Error ? error.message : "Não foi possível fazer login.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <ImageBackground source={require("../assets/imagemBackground.png")} className="flex-1 items-center justify-center">
     <View className="w-full border border-blue-800 rounded-xl p-6 items-center bg-[rgba(255,255,255,0.9)]">
        <Text className="text-blue-800 text-2xl font-bold mb-10">SEJAM BEM-VINDOS!</Text>

        <Text className="text-blue-800 text-lg font-bold text-center w-full">E-MAIL</Text>
        <Controller control={control} name="email" 
        render={({ field: { onChange, value } }) => (
            <Input text="Digite seu e-mail" imagem={<Feather name="mail" size={20} color="blue" />} keyboardType="email-address" value={value} onChangeText={onChange} />
          )} />
        {errors.email && <Text className="text-red-500 text-xs mb-2">{errors.email.message}</Text>}

        <Text className="text-blue-800 text-lg font-bold text-center ml-2">SENHA</Text>
        <Controller control={control} name="senha"
          render={({ field: { onChange, value } }) => (
            <Input text="Digite sua senha" imagem={<Feather name="lock" size={20} color="blue" />} secureTextEntry value={value} onChangeText={onChange} />
          )}
        />
        {errors.senha && <Text className="text-red-500 text-xs mb-2">{errors.senha.message}</Text>}

        <TouchableOpacity onPress={handleSubmit(Login)}
          className="bg-blue-800 py-2 px-5 rounded-md w-80 items-center justify-center h-10 mt-4">
          <Text className="text-white text-base font-bold">LOGIN</Text>
        </TouchableOpacity>
      </View>


        <TouchableOpacity onPress={() => router.push("/(cadastro)/localizar_cpf")} className="bg-blue-800 border border-blue-800 py-2 px-5 rounded-md w-80 items-center mt-6">
          <Text className="text-white text-base font-bold">PRIMEIRO ACESSO</Text>
        </TouchableOpacity>

      <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}
