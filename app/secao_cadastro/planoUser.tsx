import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, Modal } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { planos } from "../../services/planosOfensivas";
import { router } from "expo-router";

export default function PlanoOfensiva() {
  const { user } = useUser();
  const [visible, setVisible] = useState(true);

  const salvarPlano = async (plano:any) => {
    console.log("Entrou")
    if(!user?.idUser) return;
    try {
      const dadosUser = doc(db, "usuarios", user.idUser);

      await updateDoc(dadosUser, {
      planoOfensiva: {
        nome: plano.nome,
        diasMaximos: plano.diasMaximos,
        beneficios: plano.beneficios || "",
      },
      });

      Alert.alert("Sucesso", "Plano selecionado com sucesso!");
      router.replace("/login")
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
        <View key={plano.id} className="bg-[#F7FAFC] border border-blue-700 rounded-xl px-4 py-5 mb-5 w-80 items-center">
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
          <TouchableOpacity onPress={() => salvarPlano(plano)} className="mt-4 border border-blue-700 rounded-md px-6 py-2">
            <Text className="text-blue-700 font-bold text-sm">SELECIONAR</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>

      <Modal animationType="slide" transparent visible={visible} onRequestClose={() => setVisible(false)}>
          <View className="flex-1 items-center bg-black/60 justify-center px-4 ">

          <View className="w-full max-w-[560px] rounded-3xl bg-white p-6 shadow-xl" style={{ elevation: 10 }} >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-extrabold text-center text-blue-800 mb-6">
                Ofensivas de Hábitos
              </Text>

              <Text className="text-gray-700 text-base leading-relaxed mb-8"> <Text className="font-extrabold text-blue-800">Escolha suas ofensivas e multiplique seus prêmios.</Text> Quanto mais dias em sequência, maiores as recompensas. 
                Seja realista, mantenha a constância e evolua. 🏆
              </Text>

              <TouchableOpacity onPress={() => setVisible(false)} className="bg-blue-700 py-3 rounded-2xl">
                <Text className="text-white text-center font-bold text-lg">
                  OK
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>

      </Modal>
    </SafeAreaView>
  );
}
