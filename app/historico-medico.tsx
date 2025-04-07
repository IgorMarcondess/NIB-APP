import { Link, router } from "expo-router";
import { CalendarPlus2, CheckCircle } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View, Alert } from "react-native";
import { Input } from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

export default function HistoricoMedico() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [tratamento, setTratamento] = useState("");
  const [canal, setCanal] = useState("");
  const [limpeza, setLimpeza] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [cirurgia, setCirurgia] = useState("");

  const respostasValidas = ["SIM", "sim", "NAO", "NÃO", "nao", "não"];

  const validarResposta = (texto: string) => {
    return respostasValidas.includes(texto.trim().toUpperCase());
  };

  const handleEnviar = () => {
    if (!tratamento || !canal || !limpeza || !aparelho || !cirurgia) {
      Alert.alert("Erro", "Preencha todos os campos antes de enviar.");
      return;
    }

    if (
      !validarResposta(tratamento) ||
      !validarResposta(canal) ||
      !validarResposta(limpeza) ||
      !validarResposta(aparelho) ||
      !validarResposta(cirurgia)
    ) {
      Alert.alert("Erro", "Digite apenas 'SIM' ou 'NÃO' nos campos.");
      return;
    }

    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      router.push("./initial");
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white w-full h-full pt-12">
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

      <View className="flex-1 items-center">
        <Text className="text-[#003EA6] text-3xl font-bold mb-4">
          Histórico Médico
        </Text>

        <Text className="text-[#003EA6] text-lg mt-2 mb-2">Já realizou tratamento?</Text>
        <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default" value={tratamento} onChangeText={setTratamento} />

        <Text className="text-[#003EA6] text-lg mt-1 mb-2">Já realizou canal?</Text>
        <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default" value={canal} onChangeText={setCanal} />

        <Text className="text-[#003EA6] text-lg mt-1 mb-2">Já realizou limpeza?</Text>
        <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default" value={limpeza} onChangeText={setLimpeza} />

        <Text className="text-[#003EA6] text-lg mt-1 mb-2">Já colocou aparelho ortodôntico?</Text>
        <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default" value={aparelho} onChangeText={setAparelho} />

        <Text className="text-[#003EA6] text-lg mt-1 mb-2">Já realizou alguma cirurgia?</Text>
        <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default" value={cirurgia} onChangeText={setCirurgia} />

        <View className="flex-row items-center gap-16">
          <Link push href="/initial" asChild>
            <TouchableOpacity className="bg-primary py-3 px-8 rounded-full items-center justify-center mt-5">
              <Text className="text-white text-lg font-bold">Voltar</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity onPress={handleEnviar} className="bg-primary py-3 px-8 rounded-full items-center justify-center mt-6">
            <Text className="text-white text-lg font-bold">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
