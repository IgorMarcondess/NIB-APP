import { Image, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Conta() {
  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 flex-col items-center pt-16">
        <Image
          source={require("../assets/ManImage2.png")}
          className="w-[270px] h-[265px] mb-5"
        />
        <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
        <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" />
        
        <Text className="text-[#003EA6] text-lg mb-1">Senha</Text>
        <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" />
        
        <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
        <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" />

        <Link href="/" asChild>
          <TouchableOpacity className="bg-[#003EA6] py-2 px-6 rounded-full mt-5">
            <Text className="text-white text-base font-bold">Voltar</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <StatusBar style="light"/>
    </View>
  );
}
