import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { format, startOfMonth, endOfMonth } from "date-fns";
import BottomTabNavigator from "../components/navBottom";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useUser } from "../components/userContext";
import { CalendarOfensiva } from "../components/calendarOfensiva";
import CardNoticias from "../components/cardNoticias";

const Dashboard = () => {
  const { user } = useUser();
  const [diasConsecutivos, setDiasConsecutivos] = useState(12);
  const [ofensiva, setOfensiva] = useState(15);

  const dadosHabitos = {
    "2025-04-02": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: false },
    ],
    "2025-04-05": [{ nome: "Bochecho", feito: true }],
    "2025-04-07": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: true },
      { nome: "Bochecho", feito: false },
    ],
    "2025-04-08": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: true },
      { nome: "Bochecho", feito: false },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="flex-1">
        <View className="bg-blue-600 p-4 rounded-lg">
          <View className="flex-row items-center gap-3">
            <Image source={require("../assets/manImage.png")} className="w-14 h-14" />
            <View>
              <Text className="text-white text-base font-bold leading-tight">
                /*Olá, {user?.nomeUser}*/
              </Text>
              <Text className="text-white text-sm">seja bem-vindo ao Teeth Diary</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-gray-300 p-4 m-4 rounded-xl items-center"
          onPress={() => router.push("./avaliacao")}
        >
          <Text className="text-blue-700 font-bold text-lg">AVALIAÇÃO DIÁRIA</Text>
          <Text className="text-blue-500">Clique Aqui!</Text>
        </TouchableOpacity>

        <View className="my-4 justify-center items-center">
          <Text className="text-primary font-bold text-lg">Notícias Recentes</Text>
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

        <CalendarOfensiva
          titulo="Progresso atual"
          ofensiva={ofensiva}
          habitos={dadosHabitos}
        />
      </ScrollView>

      <BottomTabNavigator
        icons={[
          { name: "Ofensiva", component: <Feather name="clock" size={24} color="white" />, route: "/ofensiva" },
          { name: "Historico", component: <Feather name="heart" size={24} color="white" />, route: "/historico-medico" },
          { name: "Perfil", component: <Feather name="user" size={24} color="white" />, route: "/conta" },
        ]}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
