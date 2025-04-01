import { Image, Text, View } from "react-native"


export const Pacientes = () => {
    return (
        <View className="h-36 w-auto bg-white rounded-2xl m-5 p-3 flex-row gap-4 p-4">
            <Image source={require('../assets/person-medic.png')} /> 
            <View className="items-center">
                <Text className="font-semibold color-primary text-lg">IGOR GABRIEL PEREIRA MARCONDES</Text>
                <Text className="text-lg">"EXAME DE ROTINA"</Text>

                <View className="w-48 h-11 bg-primary justify-center items-center rounded-xl mt-4">
                <Text className="color-white text-2xl font-semibold">18:00 PM</Text>
                </View>

            </View>
        </View>
    )
}