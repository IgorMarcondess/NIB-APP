import { Image, Text, View } from "react-native"


export const Pacientes = () => {
    return (
        <View className="h-40 w-[28rem] bg-white rounded-2xl m-5 p-3 flex-row">
            <Image source={require('../assets/person-medic.png')} /> 
            <View>
                <Text className="font-semibold color-primary">IGOR GABRIEL PEREIRA MARCONDES</Text>
                <Text>"EXAME DE ROTINA"</Text>
                <View>
                <Text>aaa</Text>
                </View>
            </View>
        </View>
    )
}