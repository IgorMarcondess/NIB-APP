import { format, startOfMonth, endOfMonth } from "date-fns";
import { Check, ChevronDown, ChevronUp } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

type DatasMarcadasOfensiv = Record<string, { nome: string; feito: boolean }[]>;
type AvaliacaoProps = {
    ofensiva?: number;
    titulo?: string;
    habitos?: DatasMarcadasOfensiv
};

export const CalendarOfensiva = ({ofensiva = 5,titulo,habitos }: AvaliacaoProps) => {
    const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [day, setDay] = useState("");

    const hoje = new Date();
    const primeiroDia = format(startOfMonth(hoje), "yyyy-MM-dd");
    const ultimoDia = format(endOfMonth(hoje), "yyyy-MM-dd");

    const markedDates: Record<string, any> = {};

    if (habitos) {
        for (const data in habitos) {
            markedDates[data] = {
                selected: true,
                selectedColor: "blue",
            };
        }
    }

    const primeiraDataHabito = habitos ? Object.keys(habitos)[0] : undefined;

    return (
        <View className="p-4">

            <TouchableOpacity
                onPress={() => setMostrarAvaliacoes(!mostrarAvaliacoes)}
                className="flex-row justify-between items-center bg-gray-300 rounded-2xl p-4 h-20">
                <View className="flex-row items-center">
                    <Text className="text-blue-700 font-extrabold text-2xl">{titulo}</Text>
                    <View className="ml-2">
                        {ofensiva > 20 ? (
                            <Image source={require("../assets/Ouro.png")} className="w-6 h-6" />
                        ) : ofensiva > 10 ? (
                            <Image source={require("../assets/Prata.png")} className="w-6 h-6" />
                        ) : (
                            <Image source={require("../assets/Bronze.png")} className="w-6 h-6" />
                        )}
                    </View>
                </View>
                {mostrarAvaliacoes ? (<ChevronUp size={20} color="black" />) : (<ChevronDown size={20} color="black" />)}
            </TouchableOpacity>
                        
            {mostrarAvaliacoes && (
                <View className="bg-white p-3 rounded-2xl mt-2 items-center">
                    <Text className="text-blue-700 font-bold text-md mb-2">AVALIAÇÕES DIÁRIAS</Text>
                    <Calendar
                        current = {primeiraDataHabito}
                        onDayPress={(day: any) => setSelectedDate(day.dateString)}
                        markedDates={markedDates}
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

                    {selectedDate ? (<Text className="text-center text-blue-700 font-bold text-lg mt-3">Hábitos realizados</Text>) 
                    : (<Text className="text-center text-blue-700 font-bold text-lg mt-3">Selecione uma data</Text>)}

                    <View className="flex-row items-center gap-6 mt-3">

                        {habitos?.[selectedDate] ? (
                            (habitos[selectedDate]).map((habito) => (
                            <View key={habito.nome} className="flex-row items-center">
                                <Text className="text-blue-700 font-semibold mr-0.5">{habito.nome}</Text>
                                <Check size={18} color={habito.feito ? "green" : "gray"} />
                            </View>
                        ))
                        ): 
                        <Text className="text-gray-400 italic">Sem hábitos cadastrados para essa data</Text>
                        }

                    </View>
                </View>
            )}
        </View>
    );
};
