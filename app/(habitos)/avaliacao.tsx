import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useUser } from "../../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { enviarHabitos } from "../../services/enviarHabitos";

export default function Avaliacao() {
  const [escovacao, setEscovacao] = useState(false);
  const [fioDental, setFioDental] = useState(false);
  const [bochecho, setBochecho] = useState(false);
  const { user } = useUser();


  const envioHabitos = async () => {
    if (!user?.idUser || !user?.cpfUser) {
      console.log("Usuário não autenticado");
      return;
    }

    const hoje = new Date();
    const dataRegistro = hoje.toISOString().split("T")[0]; 

    const habitosDiarios = {
      dataRegistro,
      escovacaoDiario: escovacao ? 1 : 0,
      usoFioDiario: fioDental ? 1 : 0,
      usoEnxaguanteDiario: bochecho ? 1 : 0,
    };

    try {
      console.log(habitosDiarios)
      await axios.post(`http://192.168.15.10:8080/diario/criar?cpfUser=${user.cpfUser}`, habitosDiarios);
      console.log("Envio para API realizada com sucesso")

      await enviarHabitos(user.idUser, { escovacao, fioDental, bochecho,});
      router.push("./preparativoImagem");
    } catch (error) {
      console.error("Erro ao salvar hábitos:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center border-2 border-primary rounded-lg m-2 p-2">
          <Text className="text-center text-blue-700 font-bold text-2xl mb-4">O QUE FOI REALIZADO?</Text>

          <TouchableOpacity onPress={() => setEscovacao(!escovacao)} className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
            <Text className={`text-blue-700 text-xl font-extrabold ${escovacao ? "opacity-100" : "opacity-50"}`}>ESCOVAÇÃO</Text>
            <Feather name="check" size={30} color={escovacao ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFioDental(!fioDental)} className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
            <Text className={`text-blue-700 text-xl font-extrabold ${fioDental ? "opacity-100" : "opacity-50"}`}>FIO DENTAL</Text>
            <Feather name="check" size={30} color={fioDental ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setBochecho(!bochecho)} className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
            <Text className={`text-blue-700 text-xl font-extrabold ${bochecho ? "opacity-100" : "opacity-50"}`}>BOCHECHO</Text>
            <Feather name="check" size={30} color={bochecho ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4" onPress={envioHabitos}>
            <Text className="text-white font-bold text-center">ENVIAR</Text>
          </TouchableOpacity>

          <Image source={require("../../assets/health.png")} className="w-full h-60 mt-9 mb-20" resizeMode="contain" />

          <TouchableOpacity className="bg-blue-700 rounded-full py-3 w-36 mt-4" onPress={() => router.push("../initial")}>
            <Text className="text-white font-bold text-center">Voltar</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
