import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, Mail } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../components/input";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="flex-1 bg-blue-800 rounded-b-[270px] w-full h-[500px]">
                <Image source={require('../assets/logoteeth.png')} className="w-40 ml-[30%] mt-[-10%]" />
                <Text className="text-white text-4xl ml-5 mt-12">Bem - vindo</Text>
                <Text className="text-white text-2xl ml-5">Log In</Text>
                <View className="flex-1 items-center justify-center">
                    <Image source={require('../assets/manImage.png')} className="w-64 h-64" />
                </View>
            </View>
            <View className="flex-1 items-center w-full bg-white">
                <Text className="text-blue-800 mt-2">E-mail</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address" />
                <Text className="text-blue-800">Senhaa</Text>
                <Input text="Senha" imagem={<Eye size={20} color="blue" />} keyboardType="email-address" />

                <Link href='./cadastro-principal' asChild>
                    <TouchableOpacity className="bg-blue-800 py-2 px-5 rounded-md w-1/2 items-center mt-6">

                        <Text className="text-white text-base font-bold">ENTRAR</Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity className="bg-blue-800 py-3 px-5 rounded-md w-4/5 items-center mt-4">
                    <Text className="text-white text-base font-bold">REGISTRE-SE AQUI</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
}