import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, Mail } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";
import { app, auth, firebase } from "../services/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




export default function Index() {
    const router = useRouter();

    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const emailFixo= "professor@nota10.com";
    const senhaFixo= "10";


    const Login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha)
            Alert.alert("Login realizado com sucesso!")  
            router.navigate("./initial"); 
            
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        }
        

        // if (email === emailFixo && senha === senhaFixo) {
        //     router.navigate("./initial"); 
        // } else {
        //     Alert.alert("Erro", "E-mail ou senha inválidos!");
        // }

        

    };

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="flex-1 bg-blue-800 rounded-b-[270px] w-full h-[600px] mb-2">
                <View className="items-center justify-center">
                <Image source={require('../assets/logoteeth.png')} className="w-52 h-10 items-center justify-center" />
                </View>
                <Text className="text-white text-4xl ml-5 mt-6">Bem - vindo!</Text>
                <Text className="text-white text-2xl ml-5">Log In</Text>
                <View className="flex-1 items-center justify-center">
                    <Image source={require('../assets/manImage.png')} className="w-52 h-52" />
                </View>
            </View>

            <View className="flex-1 items-center w-full bg-white">
                <Text className="text-blue-800 mt-2">E-mail</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address" value={email} onChangeText={setEmail} />

                <Text className="text-blue-800">Senha</Text>
                <Input text="Senha" imagem={<Eye size={20} color="blue" />} secureTextEntry value={senha} onChangeText={setSenha} />

                <TouchableOpacity className="bg-primary py-2 px-5 rounded-md w-1/2 items-center mt-6"onPress={Login}>
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
