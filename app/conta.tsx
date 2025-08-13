import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc } from "firebase/firestore";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../components/userContext";
import { db } from "../services/firebase";
import { useState } from "react";

export default function Conta() {
  const { user } = useUser();
  const router = useRouter();
  const [fecharModal, setFecharModal] = useState(false);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="items-center pt-2">
          <Image source={require("../assets/ManImage2.png")} className="w-[200px] h-[200px] mb-5" />

          <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
          <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-6">
            <Text className="text-[#003EA6] text-lg">{user?.emailUser}</Text>
          </View>

          <Text className="text-[#003EA6] text-lg mb-1">CPF</Text>
          <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-6">
            <Text className="text-[#003EA6] text-lg">{user?.cpfUser}</Text>
          </View>

          <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
          <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-6">
            <Text className="text-[#003EA6] text-lg">{user?.telefoneUser}</Text>
          </View>

            <TouchableOpacity onPress={() => router.push("./initial")} className="bg-[#003EA6] py-6 px-16 rounded-full mt-2">
              <Text className="text-white text-base font-bold">Voltar</Text>
            </TouchableOpacity>

          <StatusBar style="light" />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
