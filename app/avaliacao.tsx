import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Check, CheckCircle } from "lucide-react-native";
import { useState } from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Avaliacao() {
    const [escovacao, setEscovacao] = useState(false);
    const [fioDental, setFioDental] = useState(false);
    const [bochecho, setBochecho] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false)

        if(popupVisible){
            setTimeout(() => {
                setPopupVisible(!popupVisible);
                router.navigate("./initial")
            }, 3000);
        }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
            <View className="flex-1 justify-center items-center border-2 border-primary rounded-lg m-2 p-2">
                <Text className="text-center text-blue-700 font-bold text-2xl mb-4">O QUE FOI REALIZADo?</Text>

                <TouchableOpacity
                    onPress={() => setEscovacao(!escovacao)}
                    className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                    <Text className={`text-blue-700 text-xl font-extrabold ${escovacao ? "opacity-100" : "opacity-50"}`}>
                        ESCOVAÇÃO
                    </Text>
                    <Check size={30} strokeWidth={2.5} color={escovacao ? "green" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setFioDental(!fioDental)}
                    className="flex-row items-center justify-between border-2 border-blue-500 rounded-lg p-4 w-full mb-2">
                    <Text className={`text-blue-700 text-xl font-extrabold ${fioDental ? "opacity-100" : "opacity-50"}`}>
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

                <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4" onPress={() => setPopupVisible(!popupVisible)}>
                    <Text className="text-white font-bold text-center">ENVIAR</Text>
                </TouchableOpacity>

                <Image source={require("../assets/health.png")} className="w-full h-60 mt-9 mb-20" resizeMode="contain"/>

                
                <TouchableOpacity className="bg-blue-700 rounded-full py-3 w-36 mt-4" onPress={() => router.back()}>
                    <Text className="text-white font-bold text-center">Voltar</Text>
                </TouchableOpacity>
                
                <StatusBar style="auto" />
                
            </View>
           
                        <Modal transparent animationType="fade" visible={popupVisible}>
                            <View className="flex-1 justify-center items-center bg-black/50">
                            <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                            <Text className="text-blue-700 font-extrabold text-2xl text-center">
                            ENVIO REALIZADO COM SUCESSO
                            </Text>
                            <CheckCircle size={60} color="limegreen" className="mt-4" />
            
                            </View>
                            </View>
                            </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}
