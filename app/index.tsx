import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, Mail } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useUser } from "../components/userContext";

export default function Index() {
  const router = useRouter();
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  const Login = async () => {
    if (email.toUpperCase().includes("CRM")) {
      Alert.alert("Acesso Médico", "Login como médico detectado.");
      router.push("./(medico)/tela_principal");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      Alert.alert("Login realizado com sucesso!");
      setUser({
        cpfUser: "12345678900",
        nomeUser: "Igor Gabriel",
        sobrenomeUser: "",
        telefoneUser: "11 970636566",
        dataNascimentoUser: "22/06/2005",
        planoUser: "Premium",
        emailUser: "igorgabriel@gmail.com",
      });
      setLogado(!logado);
      router.navigate("./initial");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

   // Caso você queira buscar dados da API após o login via Firebase:
  /*
  useEffect(() => {
    const baixarInfos = async () => {
      try {
        const infos = await fetch('URL_DA_SUA_API');
        const dados = await infos.json();

        console.log(`Informações: ${JSON.stringify(dados)}`);
        console.log(`Status: ${infos.status}`);

        if (infos.ok) {
          setUser(dados);
          Alert.alert("Login realizado com sucesso!");
          router.navigate("./initial");
        } else {
          Alert.alert("Erro", dados.message || "Usuário não encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Problema ao fazer login.");
      }
    };

    if (logado) baixarInfos();
  }, [logado]);
  */

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
          imagem={<Mail size={20} color="blue" />}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-blue-800">Senha</Text>
        <Input
          text="Senha"
          imagem={<Eye size={20} color="blue" />}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          className="bg-primary py-2 px-5 rounded-md w-1/2 items-center mt-6"
          onPress={Login}
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
