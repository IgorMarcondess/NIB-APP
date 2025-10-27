import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert,Modal,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import { useUser } from "../../components/userContext";
import { API } from "../../src/constants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EnviarImagem() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isEnviando, setIsEnviando] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(true);
  const { user } = useUser();

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário conceder permissão para usar a câmera."
      );
      setShowModal(true); 
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    } else {
      setShowModal(true);
    }
  };

  const enviarFoto = async () => {
    if (!photo) return;

    try {
      setIsEnviando(true);

      const manipResult = await ImageManipulator.manipulateAsync(photo, [], {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      const formData = new FormData();
      formData.append("imagem", {
        uri: manipResult.uri,
        name: user?.cpfUser + "_" + Date.now().toString() + ".jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(`http://${API.BASE_URL}/imagens/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Foto enviada com sucesso!");
        router.push("../initial");
      } else {
        const errorText = await response.text();
        console.error("Erro da API:", errorText);
        Alert.alert("Erro", `Falha ao enviar: ${errorText}`);
      }
    } catch (error: any) {
      console.error("Erro ao enviar imagem:", error);
      Alert.alert("Erro", "Falha ao enviar a foto.");
    } finally {
      setIsEnviando(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center p-4">

      <Modal visible={showModal} transparent animationType="fade" statusBarTranslucent  onRequestClose={() => setShowModal(false)}>
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="w-full bg-white rounded-2xl p-6">
            <Text className="text-xl font-extrabold text-blue-700">
              📸 Foto opcional, <Text className="text-emerald-600">+1 ponto</Text> no seu score!
            </Text>

            <View className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 items-center">
              <Text className="text-emerald-700 font-semibold">+1 ponto bônus</Text>
            </View>

            <Text className="mt-4 text-gray-700 leading-6">
              O envio da sua foto é <Text className="font-semibold">opcional</Text> e{" "}
              <Text className="font-semibold">não é obrigatório</Text>. Se preferir, você pode pular
              esta etapa agora.{"\n\n"}
              Mas se enviar a foto, você <Text className="text-emerald-700 font-semibold">ganha +1 ponto</Text> no seu score
              e acelera a validação do seu perfil.
            </Text>

            <View className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
              <Text className="text-blue-700 font-semibold">Dicas rápidas</Text>
              <Text className="text-blue-700 mt-1"> • Boa iluminação • Fundo neutro • Escova Visível </Text>
            </View>

            <View className="flex-row gap-3 mt-6">
              <TouchableOpacity onPress={() => router.push("../initial")}className="flex-1 border border-blue-700 rounded-xl py-4 items-center">
                <Text className="text-blue-700 font-semibold">Pular Etapa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                  tirarFoto(); 
                }}
                className="flex-1 bg-blue-700 rounded-xl py-4 items-center"
              >
                <Text className="text-white font-semibold">Enviar foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {!photo ? (
        <>
          <TouchableOpacity
            onPress={tirarFoto}
            className="bg-white px-12 py-6 rounded-lg border border-blue-700"
          >
            <Text className="font-extrabold text-blue-700">ABRIR CÂMERA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-blue-700 rounded-full py-3 w-36 mt-12"
            onPress={() => router.push("../initial")}
          >
            <Text className="text-white font-bold text-center">Voltar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text className="text-blue-700 text-lg font-bold mb-2">
            VERIFIQUE SE A IMAGEM ESTÁ ADEQUADA:
          </Text>
          <Image
            source={{ uri: photo }}
            className="w-full h-96 rounded-xl mt-2"
          />
          <View className="flex-row gap-16 mt-10">
            <TouchableOpacity
              onPress={() => setPhoto(null)}
              className="border border-blue-700 bg-white px-8 py-4 rounded-lg"
            >
              <Text className="text-blue-700 font-bold">CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => enviarFoto()}
              className="border border-blue-700 bg-white px-8 py-4 rounded-lg"
              disabled={isEnviando}
            >
              {isEnviando ? (
                <ActivityIndicator color="blue-700" />
              ) : (
                <Text className="text-blue-700 font-bold">ENVIAR FOTO</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}


    </SafeAreaView>
  );
}
