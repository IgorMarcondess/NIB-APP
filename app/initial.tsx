import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, LogBox, FlatList, useWindowDimensions, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import BottomTabNavigator from "../components/navBottom";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from 'expo-notifications';
import { router } from "expo-router";
import { useUser } from "../components/userContext";
import CardNoticias from "../components/cardNoticias";
import { CalendarioCompleto } from "../components/calendarioCompleto";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";



Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function ensurePermissionsAndChannel() {
  
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const req = await Notifications.requestPermissionsAsync();
    if (req.status !== 'granted') throw new Error('Permissão negada');
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Padrão',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export async function notifyNow(nome?: string) {
  await ensurePermissionsAndChannel();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Oiii ${nome ?? 'você'}! Tudo bem?`,
      body: 'Já realizou seu Check-in hoje? 👀',
    },
    trigger: null, 
  });
}

export async function scheduleHourly(nome?: string) {
  await ensurePermissionsAndChannel();
  const trigger: Notifications.TimeIntervalTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 3600,
    repeats: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Oiii ${nome ?? 'você'}! tudo bem?`,
      body: 'Já realizou seu Check-in hoje? 👀',
    },
    trigger,
  });
}

const Dashboard = () => {
 const { user } = useUser();
  const [ofensiva, setOfensiva] = useState(0);

  useEffect(() => {

      scheduleHourly(user?.nomeUser).catch(console.warn);

    const buscarDiasPreenchidos = async () => {
      
      if (!user?.idUser) return;

      const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
      ];
      const hoje = new Date();
      const mesAtual = meses[hoje.getMonth()];

      const docRef = doc(db, "usuarios", user.idUser);

      try {
        const docsUsuario = await getDoc(docRef);
        if (docsUsuario.exists()) {
          const dadosUsuario = docsUsuario.data();
          
          if (dadosUsuario[mesAtual]) {
            const diasDoMes = dadosUsuario[mesAtual];
            const totalDias = Object.entries(diasDoMes).length;
            setOfensiva(totalDias);
          } else {
            setOfensiva(0);
          }
        } else {
          setOfensiva(0);
        }
      } catch (error) {
        console.error("Erro ao buscar hábitos:", error);
        setOfensiva(0);
      }
    };

    buscarDiasPreenchidos();
  }, [user?.idUser]);

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-blue-600 p-4 rounded-lg">
          <View className="flex-row items-center gap-3">
            <Image source={require("../assets/manImage.png")} className="w-14 h-14" />
            <View>
              <Text className="text-white text-base font-bold leading-tight">
                Olá, {user?.nomeUser.toUpperCase()} 
              </Text>
              <Text className="text-white text-sm font-semibold">Bem-vindos ao Teeth Diary</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("./avaliacao")} className="items-center">
          <Image source={require("../assets/slide/slide_1.png")} style={{ width: 300, height: 300, resizeMode: "contain" }}/> 
        </TouchableOpacity>
        <View className="my-4 justify-center items-center">
          <Text className="text-primary font-bold text-lg">Notícias Recentes</Text>
          <Text className="text-primary font-semibold text-sm">Acompanhe as novidades do mundo odontológico</Text>
          <CardNoticias />
        </View>

        <View className="flex-row items-center justify-center space-x-4 px-6 mb-6">
          <View className="mr-5">
            {ofensiva > 20 ? (
              <Image source={require("../assets/Ouro_initial.jpg")} className="w-20 h-24" />
            ) : ofensiva > 10 ? (
              <Image source={require("../assets/Prata_initial.jpg")} className="w-20 h-24 " />
            ) : (
              <Image source={require("../assets/Bronze_initial.jpg")} className="w-20 h-24" />
            )}
          </View>
          <View className="border-l-2 border-gray-300 pl-4">
            <Text className="text-blue-700 font-bold text-3xl">{ofensiva} dias</Text>
            <Text className="text-gray-600 text-lg">CONSECUTIVOS</Text>
          </View>
        </View>
        <TouchableOpacity className="bg-gray-300 p-4 m-4 rounded-xl items-center"onPress={() => router.push("/habitos/avaliacao")}>
          <Text className="text-blue-700 font-bold text-lg">ENVIE SEU HÁBITO DIÁRIO</Text>
          <Text className="text-blue-500">Clique Aqui!</Text>
        </TouchableOpacity>

        <CalendarioCompleto />
      </ScrollView>

      <BottomTabNavigator
        icons={[
          { name: "Ofensiva", component: <Feather name="clock" size={24} color="white" />, route: "/ofensiva" },
          { name: "Historico", component: <Feather name="clipboard" size={24} color="white" />, route: "/historico-medico" },
          { name: "Troféus", component: <Feather name="award" size={24} color="white" />, route: "/rank/rankUser" },
        ]}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
