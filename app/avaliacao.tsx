import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { enviarHabitos } from "../services/enviarHabitos";
import { useUser } from "../components/userContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { setDoc } from "firebase/firestore/lite";



export default function Avaliacao() {
    const [escovacao, setEscovacao] = useState(false);
    const [fioDental, setFioDental] = useState(false);
    const [bochecho, setBochecho] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        if (popupVisible) {
            const timeout = setTimeout(() => {
                setPopupVisible(false);
                router.navigate("./initial");
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [popupVisible]);

    const envioHabitos = async () => {
        if (!user?.idUser) {
            console.log("entrou no if")
            return;
        }


        try {
         console.log("Esntrou no TRY")
          await enviarHabitos(user.idUser);
          setPopupVisible(true);
        } catch (error) {
          console.error("Erro ao salvar hábitos:", error);
        }
      };



const preencherMesAnterior = async (userId: string) => {
  const hoje = new Date();
  const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);

  console.log("Função chamada com ID:", userId);

  // Nome do mês em português
  const nomeMesAnterior = mesAnterior.toLocaleString("pt-BR", { month: "long" });

  // Referência ao documento do usuário
  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);

  const infosUsuario = docSnap.exists() ? docSnap.data() : {};
  if (!infosUsuario[nomeMesAnterior]) {
    infosUsuario[nomeMesAnterior] = {};
  }

  // Gerar dias aleatórios (ex: 5, 9, 14, 20)
  const diasAleatorios = [5, 9, 14, 20];
  diasAleatorios.forEach((dia) => {
    const diaFormatado = String(dia).padStart(2, "0");
    const valorAleatorio = Math.floor(Math.random() * 3) + 1; // valores de 1 a 3
    infosUsuario[nomeMesAnterior][diaFormatado] = valorAleatorio;
  });

  // Atualiza o Firestore
  await setDoc(docRef, infosUsuario);

  console.log(`Dados inseridos no mês anterior (${nomeMesAnterior}) para o usuário ${userId}.`);
};


    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-1 justify-center items-center border-2 border-primary rounded-lg m-2 p-2">
                    <Text className="text-center text-blue-700 font-bold text-2xl mb-4">O QUE FOI REALIZADO?</Text>

                    <TouchableOpacity
                        onPress={() => setEscovacao(!escovacao)}
                        className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                        <Text className={`text-blue-700 text-xl font-extrabold ${escovacao} ? "opacity-100" : "opacity-50"}`}>
                            ESCOVAÇÃO
                        </Text>
                        <Feather name="check" size={30} color={escovacao ? "green" : "gray"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setFioDental(!fioDental)}
                        className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                        <Text className={`text-blue-700 text-xl font-extrabold ${fioDental ? "opacity-100" : "opacity-50"}`}>
                            FIO DENTAL
                        </Text>
                        <Feather name="check" size={30} color={fioDental ? "green" : "gray"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setBochecho(!bochecho)}
                        className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                        <Text className={`text-blue-700 text-xl font-extrabold ${bochecho ? "opacity-100" : "opacity-50"}`}>
                            BOCHECHO
                        </Text>
                        <Feather name="check" size={30} color={bochecho ? "green" : "gray"} />
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4" onPress={() =>  preencherMesAnterior(user!.idUser)}>
                        <Text className="text-white font-bold text-center">ENVIAR</Text>
                    </TouchableOpacity>

                    <Image source={require("../assets/health.png")} className="w-full h-60 mt-9 mb-20" resizeMode="contain" />

                    <TouchableOpacity className="bg-blue-700 rounded-full py-3 w-36 mt-4" onPress={() => router.back()}>
                        <Text className="text-white font-bold text-center">Voltar</Text>
                    </TouchableOpacity>

                    <StatusBar style="auto" />
                </View>

                <Modal transparent animationType="fade" visible={popupVisible}>
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
