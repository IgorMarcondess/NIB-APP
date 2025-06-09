
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";
import { router } from "expo-router";

export default function CameraCapture() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "É necessário conceder permissão para usar a câmera.");
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
    setIsSending(true);

    const manipResult = await ImageManipulator.manipulateAsync(photo, [], {
      compress: 0.6,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    const formData = new FormData();

    // Corrigir o nome do campo para "imagem"
    formData.append("imagem", {
      uri: manipResult.uri,
      name: "foto.jpg",
      type: "image/jpeg",
    } as any);

    await axios.post(
      "http://192.168.107.234:8080/imagens/upload", formData);
      

      Alert.alert("Sucesso", "Foto enviada com sucesso!");
      router.push("./")
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao enviar a foto.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
  {!photo ? (
    <TouchableOpacity onPress={tirarFoto} className="bg-white px-12 py-6 rounded-lg border border-blue-700 ">
      <Text className="font-extrabold text-blue-700 ">ABRIR CÂMERA</Text>
    </TouchableOpacity>
  ) : (
    <>
        <Text className="text-blue-700 text-lg font-bold mb-2">VERIFIQUE SE A IMAGEM ESTÁ ADEQUADA:</Text>
      <Image source={{ uri: photo }} className="w-full h-96 rounded-xl mt-2" />
      <View className="flex-row gap-16 mt-10">
      <TouchableOpacity
        onPress={() => setPhoto(null)}
        className="border border-blue-700  bg-white px-8 py-4 rounded-lg">
        <Text className="text-blue-700  font-bold">CANCELAR</Text>
      </TouchableOpacity>

    <TouchableOpacity onPress={enviarFoto} className="border border-blue-700  bg-white px-8 py-4 rounded-lg" disabled={isSending}>
        {isSending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-blue-700  font-bold">ENVIAR FOTO</Text>
        )}
      </TouchableOpacity>

      </View>
      
      
    </>
    
  )}
</View>

  );
}
