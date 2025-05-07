import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../components/userContext";

export default function Conta() {
    const { user } = useUser()
    return (
        <View className="flex-1 bg-white items-center">
            <ScrollView>
                <View className="flex-1 flex-col items-center pt-16">
                    <Image
                        source={require("../assets/ManImage2.png")}
                        className="w-[270px] h-[265px] mb-5"
                    />
                    <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" >
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.emailUser}</Text>
                    </View>

                    <Text className="text-[#003EA6] text-lg mb-1">CPF</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" >
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.cpfUser}</Text>
                    </View>

                    <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4" >
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.telefoneUser}</Text>
                    </View>

                    <Link push href="/initial" asChild>
                        <TouchableOpacity className="bg-[#003EA6] py-2 px-6 rounded-full mt-5">
                            <Text className="text-white text-base font-bold">Voltar</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                <StatusBar style="light" />
            </ScrollView>
        </View>
    );
}
