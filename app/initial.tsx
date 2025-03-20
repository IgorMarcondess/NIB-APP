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
    const [ofensiva, setOfensiva] = useState(15); 

    const hoje = new Date();
    const primeiroDia = format(startOfMonth(hoje), "yyyy-MM-dd");
    const ultimoDia = format(endOfMonth(hoje), "yyyy-MM-dd");

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="flex-1">
                <View className="bg-blue-600 p-4 rounded-lg">
                    <View className="flex-row items-center gap-3">
                        <Image source={require("../assets/manImage.png")} className="w-14 h-14"/>
                        <View>
                            <Text className="text-white text-base font-bold leading-tight">Olá, Professor,</Text>
                            <Text className="text-white text-sm">seja bem-vindo ao Teeth Diary</Text>
                        </View>
                    </View>
                </View>
                <View className="bg-gray-300 p-4 m-4 rounded-xl items-center">
                    <Text className="text-blue-700 font-bold text-lg">AVALIAÇÃO DIÁRIA</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 underline">Clique Aqui !</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-center space-x-4 px-6 mb-6">
                    {/* Medalha */}
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

                {/* Calendário */}
                <Calendar
                    onDayPress={(day: any) => setSelectedDate(day.dateString)}
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
            <BottomTabNavigator
                icons={[
                    { name: "Home", component: <Home size={24} color="white" />, route: "/" },
                    { name: "Camera", component: <Camera size={24} color="white" />, route: "/historico-medico" },
                    { name: "Perfil", component: <User size={24} color="white" />, route: "/conta" },
                ]}
            />
        </SafeAreaView>
    );
};

export default Dashboard;
