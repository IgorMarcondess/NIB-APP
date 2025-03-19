import { format, startOfMonth, endOfMonth } from "date-fns";
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';


type AvaliacaoProps = {
    ofensiva?: number;
    titulo?: string;
    children?: JSX.Element;
    habitos?: Array<{ nome: string; feito: boolean }>;
};

export const CalendarOfensiva = (Props: AvaliacaoProps) => {

    const { ofensiva = 5, titulo = "MARÇO", children, 
        habitos = [{ nome: "Escovação", feito: true },{ nome: "Fio dental", feito: false },{ nome: "Bochecho", feito: true },] , ...rest } = Props;

    const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const hoje = new Date();
    const primeiroDia = format(startOfMonth(hoje), "yyyy-MM-dd");
    const ultimoDia = format(endOfMonth(hoje), "yyyy-MM-dd");

    return (
        <SafeAreaView className='p-5'>
            <TouchableOpacity
                onPress={() => setMostrarAvaliacoes(!mostrarAvaliacoes)}
                className="flex-row justify-start items-center bg-gray-300 rounded-2xl p-4 h-20">
                <Text className="text-blue-700 font-extrabold text-2xl ">{titulo}</Text>
                <View className="flex-row mr-auto ml-2">
                    {ofensiva > 20 ? (<Image source={require('../assets/Ouro.png')} />) : ofensiva > 10 ? (
                        <Image source={require('../assets/Prata.png')} />) : (<Image source={require('../assets/Bronze.png')} />)}
                </View>
                {mostrarAvaliacoes ? (<ChevronUp size={20} color="black" className='' />) : (<ChevronDown size={20} color="black" className='' />)}
            </TouchableOpacity>

            {mostrarAvaliacoes && (
                <View className="flex bg-white p-3  rounded-2xl items-center">
                    <Text className="text-blue-700 font-bold text-md mb-2"> AVALIAÇÕES DIÁRIAS</Text>
                        <Calendar onDayPress={(day:any) => setSelectedDate(day.dateString)}
                        markedDates={{[selectedDate]: { selected: true, selectedColor: "blue" },}}
                        minDate={primeiroDia} maxDate={ultimoDia} disableArrowLeft={true} disableArrowRight={true}
                        theme={{
                            todayTextColor: "blue",
                            arrowColor: "black",
                            textMonthFontWeight: "bold",
                            textDayFontWeight: "500",
                            selectedDayBackgroundColor: "blue",
                            selectedDayTextColor: "#fff",}}
                    />

                    {/* Data Selecionada */}
                    {selectedDate ? (<Text className="text-center text-blue-700 font-bold text-lg mt-3">{selectedDate}</Text>) : (<Text className="text-center text-blue-700 font-bold text-lg mt-3">Selecione uma data</Text>)}

                    <View className="flex-row items-center gap-6">
                    {habitos.map((habito) => (
                            <View key={habito.nome} className="flex-row items-center ">
                                <Text className="text-blue-700 font-semibold mr-0.5">{habito.nome}</Text>
                                <Check size={18} color={habito.feito ? "green" : "gray"} />
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </SafeAreaView>



    )

}



