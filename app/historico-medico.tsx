import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../components/userContext";
import axios from "axios";
import { API } from "../src/constants";

const schema = z.object({
  tratamento: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Selecione SIM ou NÃO",
    }),
  canal: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Selecione SIM ou NÃO",
    }),
  limpeza: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Selecione SIM ou NÃO",
    }),
  aparelho: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Selecione SIM ou NÃO",
    }),
  cirurgia: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Selecione SIM ou NÃO",
    }),
});

type FormData = z.infer<typeof schema>;

export default function HistoricoMedico() {
  const { user } = useUser();
  const [popupEnviadoAgora, setPopupEnviadoAgora] = useState(false); // Modal de sucesso
  const [show, setShow] = useState(true); // Modal introdutório

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!user?.cpfUser) {
      return Alert.alert("Erro", "Usuário não identificado.");
    }

    const payload = {
      tratamentoHistorico: data.tratamento === "SIM" ? 1 : 0,
      canalHistorico: data.canal === "SIM" ? 1 : 0,
      limpezaHistorico: data.limpeza === "SIM" ? 1 : 0,
      carieHistorico: 0,
      ortodonticoHistorico: data.aparelho === "SIM" ? 1 : 0,
      cirurgiaHistorico: data.cirurgia === "SIM" ? 1 : 0,
    };

    try {
      await axios.post(
        `http://${API.BASE_URL}/historico/inserir/${user.cpfUser}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Abre o modal de sucesso
      setPopupEnviadoAgora(true);

     
      setTimeout(() => {
        setPopupEnviadoAgora(false);
        router.replace("/login"); 
      }, 2500);
    } catch (error: any) {
      console.error("Erro ao enviar histórico:", error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o histórico. Tente novamente."
      );
    }
  };

  // Componente reutilizável para os botões de SIM/NÃO
  const BooleanButtons = ({
    value,
    onChange,
  }: {
    value?: string;
    onChange: (val: string) => void;
  }) => (
    <View className="flex-row justify-between mt-2">
      {["SIM", "NÃO"].map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onChange(option)}
          className={`flex-1 py-3 mx-1 rounded-lg border ${
            value === option ? "bg-blue-700 border-blue-700" : "border-blue-700"
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              value === option ? "text-white" : "text-blue-700"
            }`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white items-center pt-12 px-4">
      {/* Modal introdutório */}
      <Modal
        visible={show}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShow(false)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="w-full bg-white rounded-2xl p-6">
            <Text className="text-xl font-extrabold text-blue-700">
              Etapa - Histórico Médico
            </Text>

            <Text className="mt-3 text-gray-700 leading-6">
              Aqui coletamos informações sobre seus
              <Text className="font-semibold">
                {" "}
                procedimentos e cuidados bucais
              </Text>{" "}
              para entender sua trajetória até agora. Esses dados nos ajudam a
              <Text className="font-semibold"> personalizar sua jornada</Text> e
              oferecer orientações mais relevantes.
            </Text>

            <TouchableOpacity
              onPress={() => setShow(false)}
              className="mt-6 bg-blue-700 rounded-xl py-4 items-center"
            >
              <Text className="text-white font-semibold">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de sucesso (após envio) */}
      <Modal
        visible={popupEnviadoAgora}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPopupEnviadoAgora(false)}
      >
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="w-full bg-white rounded-2xl p-6 items-center">
            {/* Ícone */}
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center mb-4">
              <Feather name="check" size={32} color="#16a34a" />
            </View>

            {/* Título */}
            <Text className="text-xl font-extrabold text-green-700 text-center">
              Histórico Médico registrado com sucesso
            </Text>

            {/* Mensagem (ajustada para soar mais natural) */}
            <Text className="mt-3 text-gray-700 text-center leading-6">
              Estamos te levando para a tela inicial para você{" "}
              <Text className="font-semibold">
                acessar e testar suas credenciais
              </Text>
              .
            </Text>

            {/* Indicador simples (barra) */}
            <View className="w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
              <View className="h-2 bg-green-600" style={{ width: "100%" }} />
            </View>

            {/* Botão opcional de ir agora (descomente se quiser habilitar) */}
            {/*
            <TouchableOpacity
              onPress={() => {
                setPopupEnviadoAgora(false);
                router.replace("/initial");
              }}
              className="mt-5 bg-green-600 rounded-xl py-3 px-6"
            >
              <Text className="text-white font-semibold">Ir agora</Text>
            </TouchableOpacity>
            */}
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
      <Text className="text-[#003EA6] text-3xl font-bold mb-6">
        Histórico Médico
      </Text>

      {/* Perguntas */}
      {[
        { label: "Já realizou tratamento?", name: "tratamento" },
        { label: "Já realizou canal?", name: "canal" },
        { label: "Já realizou limpeza?", name: "limpeza" },
        { label: "Já colocou aparelho ortodôntico?", name: "aparelho" },
        { label: "Já realizou alguma cirurgia?", name: "cirurgia" },
      ].map((item) => (
        <View key={item.name} className="w-full mb-4">
          <Text className="text-[#003EA6] text-base mb-1">{item.label}</Text>
          <Controller
            control={control}
            name={item.name as keyof FormData}
            render={({ field: { onChange, value } }) => (
              <BooleanButtons value={value} onChange={onChange} />
            )}
          />
          {errors[item.name as keyof FormData] && (
            <Text className="text-red-500 text-xs mt-1">
              {errors[item.name as keyof FormData]?.message as string}
            </Text>
          )}
        </View>
      ))}

      <View className="flex-row gap-6 mt-6">
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-primary py-3 px-8 rounded-full"
        >
          <Text className="text-white text-lg font-bold">Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-primary py-3 px-8 rounded-full"
        >
          <Text className="text-white text-lg font-bold">Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
