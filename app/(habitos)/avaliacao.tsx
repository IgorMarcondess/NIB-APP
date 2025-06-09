import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useUser } from "../../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../services/firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

export default function Avaliacao() {
  const [escovacao, setEscovacao] = useState(false);
  const [fioDental, setFioDental] = useState(false);
  const [bochecho, setBochecho] = useState(false);
  const [popupEnvio, setPopupEnvio] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (popupEnvio) {
      const timeout = setTimeout(() => {
        setPopupEnvio(false);
        router.navigate("./initial");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [popupEnvio]);

  const envioHabitos = async () => {
    if (!user?.idUser) {
      console.log("Usuário não autenticado");
      return;
    }

    const hoje = new Date();
    const dataRegistro = hoje.toISOString().split("T")[0]; // YYYY-MM-DD
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    const mesAtual = meses[hoje.getMonth()];
    const diaAtual = hoje.getDate();

    const habitosDiarios = {
      dataRegistro,
      escovacaoDiario: escovacao ? 1 : 0,
      usoFioDiario: fioDental ? 1 : 0,
      usoEnxaguanteDiario: bochecho ? 1 : 0,
    };

    try {

        console.log("Dados", habitosDiarios)
      // 🔹 Envio para API externa
      await axios.post("http://192.168.15.13:8080/diario/criar?cpfUser=98684948009", habitosDiarios);

      // 🔹 Envio para o Firebase
      const docRef = doc(db, "usuarios", user.idUser);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dadosExistentes = docSnap.data();
        const dadosMes = dadosExistentes[mesAtual] || {};
        dadosMes[diaAtual] = {
          escovacao: escovacao,
          fioDental: fioDental,
          bochecho: bochecho,
        };
        await updateDoc(docRef, { [mesAtual]: dadosMes });
      } else {
        await setDoc(docRef, {
          [mesAtual]: {
            [diaAtual]: {
              escovacao: escovacao,
              fioDental: fioDental,
              bochecho: bochecho,
            },
          },
        });
      }
      router.push("./enviarImagem"); // <- caminho correto da página EnviarImagem
      setPopupEnvio(true);
    } catch (error) {
      console.error("Erro ao salvar hábitos:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center border-2 border-primary rounded-lg m-2 p-2">
          <Text className="text-center text-blue-700 font-bold text-2xl mb-4">O QUE FOI REALIZADO?</Text>

          <TouchableOpacity
            onPress={() => setEscovacao(!escovacao)}
            className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2"
          >
            <Text className={`text-blue-700 text-xl font-extrabold ${escovacao ? "opacity-100" : "opacity-50"}`}>
              ESCOVAÇÃO
            </Text>
            <Feather name="check" size={30} color={escovacao ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFioDental(!fioDental)}
            className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2"
          >
            <Text className={`text-blue-700 text-xl font-extrabold ${fioDental ? "opacity-100" : "opacity-50"}`}>
              FIO DENTAL
            </Text>
            <Feather name="check" size={30} color={fioDental ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBochecho(!bochecho)}
            className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2"
          >
            <Text className={`text-blue-700 text-xl font-extrabold ${bochecho ? "opacity-100" : "opacity-50"}`}>
              BOCHECHO
            </Text>
            <Feather name="check" size={30} color={bochecho ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4" onPress={envioHabitos}>
            <Text className="text-white font-bold text-center">ENVIAR</Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/health.png")}
            className="w-full h-60 mt-9 mb-20"
            resizeMode="contain"
          />

          <TouchableOpacity className="bg-blue-700 rounded-full py-3 w-36 mt-4" onPress={() => router.back()}>
            <Text className="text-white font-bold text-center">Voltar</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>

        <Modal transparent animationType="fade" visible={popupEnvio}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
              <Text className="text-blue-700 font-extrabold text-2xl text-center">
                ENVIO REALIZADO COM SUCESSO!
              </Text>
              <Feather name="check-circle" size={60} color="limegreen" style={{ marginTop: 16 }} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
