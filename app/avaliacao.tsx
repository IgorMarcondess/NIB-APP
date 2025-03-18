import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Avaliacao() {
    return (
        <SafeAreaView className="flex p-4">
            <View className="flex border-4 border-primary h-full">
                <Text>texto</Text>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}