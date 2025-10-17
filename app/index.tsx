import React from "react";
import { View, Text, TouchableOpacity, Platform, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";



export default function Index() {
  const handleOpcao = (ehCliente: boolean) => {
    if (ehCliente) {
      router.push("/login");
    } else {
      router.push("/cadastro");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center px-4 py-6">

      <Text className="text-center text-2xl text-blue-700 font-extrabold mb-16 mt-28 uppercase">Escolha uma opção</Text>

      <TouchableOpacity onPress={() => router.push("/(rank)/usuario")} className="bg-[#F7FAFC] border border-blue-700 rounded-xl px-4 py-6 mb-6 w-80 h-44 items-center shadow-sm" >
        <MaterialCommunityIcons name="account-check" size={56} color="#1D4ED8" style={{ marginBottom: 12 }}/>

        <Text className="text-blue-700 font-bold text-base">SOU CLIENTE</Text>
      </TouchableOpacity>

    <TouchableOpacity onPress={() => Linking.openURL("https://www.odontoprev.com.br")} className="bg-[#F7FAFC] border border-blue-700 rounded-xl px-4 py-6 w-80 h-44 items-center shadow-sm" >
        <MaterialCommunityIcons name="account-cancel" size={56} color="#1D4ED8" style={{ marginBottom: 12 }} />
        <Text className="text-blue-700 font-bold text-base">NÃO SOU CLIENTE</Text>
      </TouchableOpacity> 
    </SafeAreaView>
  );
}
