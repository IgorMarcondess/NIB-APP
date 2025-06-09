import React from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const planos = [
  {
    id: "plano-5",
    nome: "5 Dias Ofensivas",
    diasMaximos: 5,
    beneficios: null,
    imagem: null,
  },
  {
    id: "plano-15",
    nome: "15 Dias Ofensivas",
    diasMaximos: 15,
    beneficios: null,
    imagem: null,
  },
  {
    id: "plano-30",
    nome: "30 Dias Ofensivas",
    diasMaximos: 30,
    beneficios: "Necessário com acessórios odontológicos",
    imagem: require("../../assets/5dias.png"),
  },
  {
    id: "plano-40",
    nome: "40 Dias Ofensivas",
    diasMaximos: 40,
    beneficios: "Higienização e Clareamento Dental",
    imagem: require("../../assets/man.dentes.png"),
  },
];

export default function PlanoOfensiva() {
  const { user } = useUser();

  const salvarPlano = async (plano:any) => {
    console.log("Entrou")
    if(!user?.idUser) return;

    try {
      console.log("Entrou novamente")
      const userRef = doc(db, "usuarios", user.idUser);

      await updateDoc(userRef, {
      planoOfensiva: {
        nome: plano.nome,
        diasMaximos: plano.diasMaximos,
        beneficios: plano.beneficios || "",
      },
      });

      Alert.alert("Sucesso", "Plano selecionado com sucesso!");
      router.replace("/")
    } catch (error) {
      console.error("Erro ao salvar plano:", error);
      Alert.alert("Erro", "Não foi possível salvar o plano. Tente novamente.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center px-4 py-6">
    <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }} className="flex-1" showsVerticalScrollIndicator={false}>
      <Text className="text-center text-blue-700 font-bold text-xl mb-6 uppercase"> Escolha seu plano de ofensiva </Text>

      {planos.map((plano) => (
        <View
          key={plano.id}
          className="bg-[#F7FAFC] border border-blue-700 rounded-xl px-4 py-5 mb-5 w-80 items-center"
        >
          <View className={`flex-row ${plano.imagem ? "justify-between" : "justify-center"} items-center w-full`}>
            <View className={`${plano.imagem ? "" : "items-center"}`}>
              <Text className={`text-blue-700 font-extrabold ${plano.imagem ? "text-xl" : "text-2xl"}`}>{plano.diasMaximos} DIAS</Text>
              <Text className="text-blue-700 font-bold -mt-1">OFENSIVAS</Text>
              {plano.beneficios && (
                <Text className="text-gray-500 text-xs mt-1 w-56 ">{plano.beneficios}</Text>
              )}
            </View>
            {plano.imagem && (
              <Image source={plano.imagem} className="w-14 h-14 ml-2" resizeMode="contain" />
            )}
          </View>

          <TouchableOpacity
            onPress={() => salvarPlano(plano)}
            className="mt-4 border border-blue-700 rounded-md px-6 py-2"
          >
            <Text className="text-blue-700 font-bold text-sm">SELECIONAR</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}
