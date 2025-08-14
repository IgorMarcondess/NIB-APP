import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import { useUser } from "../../components/userContext";

export default function EnviarImagem() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isEnviando, setIsEnviando] = useState(false);
  const { user } = useUser();

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário conceder permissão para usar a câmera."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
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

      const response = await fetch("http://192.168.15.9:8080/imagens/upload", {
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
    <View className="flex-1 bg-white items-center justify-center p-4">
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
    </View>
  );
}
