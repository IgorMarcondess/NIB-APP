import { StatusBar } from "expo-status-bar";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Avaliacao() {
    const [escovacao, setEscovacao] = useState(false);
    const [fioDental, setFioDental] = useState(false);
    const [bochecho, setBochecho] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center items-center border-2 border-primary rounded-lg m-2 p-2">
                <Text className="text-center text-blue-700 font-bold text-2xl mb-4">O QUE FOI REALIZADO?</Text>

                <TouchableOpacity
                    onPress={() => setEscovacao(!escovacao)}
                    className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                    <Text className={`text-blue-700 text-xl font-semibold ${escovacao ? "opacity-100" : "opacity-50"}`}>
                        ESCOVAÇÃO
                    </Text>
                    <Check size={30} strokeWidth={2.5} color={escovacao ? "green" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFioDental(!fioDental)}
                    className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                    <Text className={`text-blue-700 text-xl font-semibold ${fioDental ? "opacity-100" : "opacity-50"}`}>
                        FIO DENTAL
                    </Text>
                    <Check size={30} strokeWidth={2.5} color={fioDental ? "green" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setBochecho(!bochecho)}
                    className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                    <Text className={`text-blue-700 text-xl font-extrabold ${bochecho ? "opacity-100" : "opacity-50"}`}>
                        BOCHECHO
                    </Text>
                    <Check size={30} strokeWidth={2.5} color={bochecho ? "green" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4">
                    <Text className="text-white font-bold text-center">ENVIAR</Text>
                </TouchableOpacity>

                <Image
                    source={require("../assets/health.png")}
                    className="w-full h-60 mt-9 mb-20"
                    resizeMode="contain"
                />

                <TouchableOpacity className="bg-blue-700 rounded-full py-3 w-36 mt-4">
                    <Text className="text-white font-bold text-center">Voltar</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>

        </SafeAreaView>
    );
}
