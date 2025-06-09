import { router } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PreparativoImagem() {
  return (
    <SafeAreaView className="flex-1 bg-[#003F91] items-center">
      <ScrollView contentContainerStyle={{ alignItems: "center"}}>
      <View className="items-center p-2">
      <Image source={require('../../assets/logoteeth.png')} className="w-40 mt-4 mb-10" />

        <Text className="text-white text-lg text-center font-medium mb-10 px-2">
          A FOTO DEVE SER TIRADA SEGURANDO SUA ESCOVA DE DENTE, DE PREFERÊNCIA EM FRENTE AO ESPELHO OU COMO UM SELFIE 
        </Text>

        <Text className="text-white text-lg font-bold w-96 mb-2">ENVIE A FOTO COM OS SEGUINTES REQUISITOS:</Text>

        <View className="w-full px-4 mb-6">
          <Text className="text-white text-sm font-semibold mb-2">- A ESCOVA DE DENTE DEVE ESTAR VISIVEL NA IMAGEM DA PESSOA.</Text>
          <Text className="text-white text-sm font-semibold mb-2">- A IMAGEM DEVE TER BOA ILUMINAÇÃO E ESTAR EM FOCO.</Text>
          <Text className="text-white text-sm font-semibold mb-6">- A FOTO DEVE SER TIRADA EM UM AMBIENTE ADEQUADO, COMO O BANHEIRO OU FRENTE AO ESPELHO.</Text>
        </View>
        <Image source={require('../../assets/selfie.jpg')} className="w-96 h-80 rounded-xl mb-12" />
    
        <View className="w-full bg-transparent" />

        <View className="flex-row justify-between w-full px-4">
          <TouchableOpacity onPress={() => router.push("./initial.tsx")} className="flex-1 border border-white py-3 rounded-full mr-2 items-center">
            <Text className="text-white font-bold">VOLTAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("./enviarImagem")} className="flex-1 border border-white py-3 rounded-full ml-2 items-center">
            <Text className="text-white font-bold">INICIAR</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
