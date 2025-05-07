import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";
import { useUser } from "../components/userContext";
import { loginUser } from "../services/firebase";



export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { setUser } = useUser();

  const handleLogin = async (): Promise<void> => {
    try {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha todos os campos.");
        return;
      }

      const userData = await loginUser(email, senha); // userData precisa conter pelo menos .nome e .email
      console.log("Informações para o SetData", userData)

      setUser(userData);
      Alert.alert("Login realizado com sucesso!");
      console.log("Usuário autenticado:", userData);

      // Envio para o AsyncStorage
      await AsyncStorage.setItem(
        email, // chave
        JSON.stringify({ nome: userData.nomeUser }) // valor
      );

      router.navigate("./initial");

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao fazer login", error.message);
      } else {
        Alert.alert("Erro desconhecido", "Não foi possível fazer login.");
      }
    }
  };




  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className="flex-1 bg-blue-800 rounded-b-[270px] w-full h-[600px] mb-2">
        <View className="items-center justify-center mt-4">
          <Image
            source={require("../assets/logoteeth.png")}
            className="w-52 h-10"
            resizeMode="contain"
          />
        </View>
        <Text className="text-white text-4xl ml-5 mt-6">Bem - vindo!</Text>
        <Text className="text-white text-2xl ml-5">Log In</Text>

        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../assets/manImage.png")}
            style={{
              width: Dimensions.get("window").width * 0.5,
              height: Dimensions.get("window").width * 0.5,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>

      <View className="flex-1 items-center w-full bg-white">
        <Text className="text-blue-800 mt-2">E-mail</Text>
        <Input
          text="Digite seu E-mail!"
          imagem={<Feather name="mail" size={20} color="blue" />}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-blue-800">Senha</Text>
        <Input
          text="Senha"
          imagem={<Feather name="eye" size={20} color="blue" />}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          className="bg-primary py-2 px-5 rounded-md w-1/2 items-center mt-6"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-bold">ENTRAR</Text>
        </TouchableOpacity>

        <Link href={"/cadastro-principal"} asChild>
          <TouchableOpacity className="bg-primary py-3 px-5 rounded-md w-4/5 items-center mt-4">
            <Text className="text-white text-base font-bold">REGISTRE-SE AQUI</Text>
          </TouchableOpacity>
        </Link>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
