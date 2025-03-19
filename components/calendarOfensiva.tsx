import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DatePicker } from '../components/nativewindui/DatePicker';


type AvaliacaoMensalProps = {
    ofensiva?: number;
    titulo?: string;
    children?: JSX.Element;
};

export const CalendarOfensiva = (Props: AvaliacaoMensalProps) => {

    const { ofensiva = 5, titulo = "Nome", children, ...rest } = Props;
    const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
    const [corMedalha, setCorMedalha] = useState("")
    const [date, setDate] = React.useState(new Date());

    const getMedalColor = (medalha: string) => {
        switch (medalha) {
            case "ouro":
                setCorMedalha("");
            case "prata":
                setCorMedalha("prata");
            case "bronze":
                return "#cd7f32";
            default:
                return "transparent";
        }
    }
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => setMostrarAvaliacoes(!mostrarAvaliacoes)}
                className="flex-row justify-between items-center bg-gray-300 rounded-2xl p-3">
                <Text className="text-blue-700 font-bold text-lg">{titulo}</Text>
                <View className="flex-row items-center">
                    {ofensiva > 20 ? (<Image source={require('../assets/Ouro.png')} />) : ofensiva > 10 ? (
                        <Image source={require('../assets/Prata.png')} />) : (<Image source={require('../assets/Bronze.png')} />)}
                    {mostrarAvaliacoes ? (<ChevronUp size={20} color="black" />) : (<ChevronDown size={20} color="black" />)}
                </View>
            </TouchableOpacity>

            {mostrarAvaliacoes && (
                <View className="bg-white p-3  rounded-2xl">
                    <Text className="text-blue-700 font-bold text-md mb-2">
                        AVALIAÇÕES DIÁRIAS
                    </Text>
                    <DatePicker value={date}
                        mode="datetime"
                        onChange={(ev) => {
                            setDate(new Date(ev.nativeEvent.timestamp));
                        }}
                    />

                    {/* Data Selecionada */}
                    <Text className="text-center text-blue-700 font-bold text-lg mt-3">
                        10 DE SETEMBRO
                    </Text>

                    {/* Ícones de avaliação do dia */}
                    <View className="flex-row justify-center space-x-4 mt-2">
                        <View className="flex-row items-center">
                            <Text className="text-blue-700 font-semibold mr-1">
                                Escovação
                            </Text>
                            <Check size={18} color="green" />
                        </View>

                        <View className="flex-row items-center">
                            <Text className="text-blue-700 font-semibold mr-1">
                                Fio dental
                            </Text>
                            <Check size={18} color="green" />
                        </View>

                        <View className="flex-row items-center">
                            <Text className="text-blue-700 font-semibold mr-1">Bochecho</Text>
                            <Check size={18} color="green" />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>



    )

}

