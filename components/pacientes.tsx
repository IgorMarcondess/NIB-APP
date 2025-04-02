import { router } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native"

type PacientesProps ={
    imagem: ImageSourcePropType;
    nome: string;
    exame: string;
    hours: string;
}

export const Pacientes = (Props: PacientesProps) => {
    const {imagem = require('../assets/person-medic.png'), nome = 'igor gabriel ', exame , hours} = Props
    return (
        <TouchableOpacity className="h-36 w-auto bg-white rounded-3xl m-5 flex-row p-3 gap-1" onPress={() => router.push('../app/initial.tsx')}>
            <Image source={imagem} /> 
            <View className="items-center">
                <Text className="font-semibold color-primary text-lg">{nome}</Text>
                <Text className="text-lg">{exame}</Text>

                <View className="w-48 h-11 bg-primary justify-center items-center rounded-xl mt-4">
                <Text className="color-white text-2xl font-semibold">18:00 PM</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}