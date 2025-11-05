import React, { useState } from "react";
import {View,Text,TouchableOpacity,Image,Alert,ScrollView,Modal,} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { planos } from "../../services/planosOfensivas";
import { router } from "expo-router";

export default function PlanoOfensiva() {
  const { user } = useUser();
  const [visible, setVisible] = useState(true);

  const salvarPlano = async (plano: any) => {
    if (!user?.idUser) return;
    try {
      const dadosUser = doc(db, "usuarios", user.idUser);

      await updateDoc(dadosUser, {
        planoOfensiva: {
          nome: `Plano ${plano.diasMaximos} dias`,
          diasMaximos: plano.diasMaximos,
          pontos: plano.pontos,
          desconto: plano.beneficios,
        },
      });

      Alert.alert("Sucesso", "Plano selecionado com sucesso!");
      router.replace("../historico-medico");
    } catch (error) {
      console.error("Erro ao salvar plano:", error);
      Alert.alert("Erro", "Não foi possível salvar o plano. Tente novamente.");
    }
  };

  const coresPlano = [
    "#E0F7FA",
    "#B2EBF2",
    "#80DEEA",
    "#4DD0E1",
    "#26C6DA",
    "#00ACC1",
  ];

  return (
    <SafeAreaView className="flex-1 bg-white items-center px-4 py-6">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20, alignItems: "center" }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-blue-700 font-bold text-xl mb-6 uppercase">
          Escolha seu plano de ofensiva
        </Text>

        {planos.map((plano, index) => (
          <View
            key={plano.id}
            className="rounded-2xl w-80 mb-5 p-4 shadow-md"
            style={{ backgroundColor: coresPlano[index % coresPlano.length] }}
          >
            <View className="flex-row justify-between items-center w-full">
              <View className="items-center">
                <Text className="text-blue-800 font-extrabold text-2xl">
                  {plano.diasMaximos} DIAS
                </Text>
                <Text className="text-blue-800 font-bold -mt-1 mb-2">
                  OFENSIVAS
                </Text>
                <Text className="text-gray-700 text-sm text-center flex-col">
                  <Text className="font-bold">{plano.pontos} pontos</Text> - {" "}
                  {plano.beneficios} &
                </Text>
                  <Text className="text-gray-700 text-sm text-center flex-col">
                  <Text className="font-bold"> {plano.premio}</Text>
                </Text>
              </View>
              {plano.imagem && (
                <Image
                  source={plano.imagem}
                  className="w-20 h-20"
                  resizeMode="contain"
                />
              )}
            </View>

            <TouchableOpacity
              onPress={() => salvarPlano(plano)}
              className="mt-4 py-2 rounded-full border border-blue-700 bg-white"
            >
              <Text className="text-blue-700 font-bold text-center">
                SELECIONAR
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 items-center bg-black/60 justify-center px-4">
          <View
            className="w-full max-w-[560px] rounded-3xl bg-white p-6 shadow-xl"
            style={{ elevation: 10 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-extrabold text-center text-blue-800 mb-6">
                Ofensivas de Hábitos
              </Text>

              <Text className="text-gray-700 text-base leading-relaxed mb-8">
                <Text className="font-extrabold text-blue-800">
                  Escolha suas ofensivas e multiplique seus prêmios.
                </Text>{" "}
                Quanto mais dias em sequência e mais pontos acumulados, maiores
                os descontos e recompensas. Seja realista, mantenha a constância
                e evolua! 🏆
              </Text>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="bg-blue-700 py-3 rounded-2xl"
              >
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
