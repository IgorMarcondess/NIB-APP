import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { Home, Camera, User } from "lucide-react-native";
import BottomTabNavigator from "../components/navBottom";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
    const [diasConsecutivos, setDiasConsecutivos] = useState(12);
    const [selectedDate, setSelectedDate] = useState("");

    // Obtendo primeiro e último dia do mês
    const hoje = new Date();
    const primeiroDia = format(startOfMonth(hoje), "yyyy-MM-dd");
    const ultimoDia = format(endOfMonth(hoje), "yyyy-MM-dd");

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Scroll da Tela */}
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Header */}
                <View className="bg-blue-600 p-6 rounded-b-2xl">
                    <View className="flex-row items-center space-x-3">
                        <Image source={require("../assets/manImage.png")} className="w-12 h-12 rounded-full" />
                        <Text className="text-white text-lg font-bold">Olá, Usuário</Text>
                    </View>
                    <Text className="text-white text-sm">Welcome to Teeth Diary</Text>
                </View>

                {/* Card de Avaliação */}
                <View className="bg-gray-300 p-4 m-4 rounded-xl items-center">
                    <Text className="text-blue-700 font-bold text-lg">AVALIAÇÃO DIÁRIA</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 underline">Clique Aqui !</Text>
                    </TouchableOpacity>
                </View>

                {/* Contador de Dias */}
                <View className="items-center mb-4">
                    <Text className="text-blue-700 font-bold text-3xl">{diasConsecutivos} dias</Text>
                    <Text className="text-gray-600">CONSECUTIVOS</Text>
                </View>

                {/* Calendário */}
                <Calendar
                    onDayPress={(day:any) => setSelectedDate(day.dateString)}
                    markedDates={{
                        [selectedDate]: { selected: true, selectedColor: "blue" },
                    }}
                    minDate={primeiroDia}
                    maxDate={ultimoDia}
                    disableArrowLeft={true}
                    disableArrowRight={true}
                    theme={{
                        todayTextColor: "blue",
                        arrowColor: "black",
                        textMonthFontWeight: "bold",
                        textDayFontWeight: "500",
                        selectedDayBackgroundColor: "blue",
                        selectedDayTextColor: "#fff",
                    }}
                />

                {/* Data Selecionada */}
                {selectedDate ? (
                    <Text className="text-center text-blue-700 font-bold text-lg mt-3">
                        {selectedDate}
                    </Text>
                ) : (
                    <Text className="text-center text-blue-700 font-bold text-lg mt-3">
                        Selecione uma data
                    </Text>
                )}
            </ScrollView>
            {/* Barra de Navegação Fixa */}
            <SafeAreaView className="flex-1 justify-center p-2">
            <BottomTabNavigator
                icons={[
                    { name: "Home", component: <Home size={24} color="white" />, route: "/" },
                    { name: "Camera", component: <Camera size={24} color="white" />, route: "/camera" },
                    { name: "Perfil", component: <User size={24} color="white" />, route: "/perfil" },
                ]}
            />
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default Dashboard;
