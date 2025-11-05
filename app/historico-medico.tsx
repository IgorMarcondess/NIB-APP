import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../components/userContext";
import axios from "axios"; // IMPORTAÇÃO CORRETA
import { API } from "../src/constants"; // Certifique-se de que API.BASE_URL está definido

const schema = z.object({
  tratamento: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Digite SIM ou NÃO",
    }),
  canal: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Digite SIM ou NÃO",
    }),
  limpeza: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Digite SIM ou NÃO",
    }),
  aparelho: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Digite SIM ou NÃO",
    }),
  cirurgia: z
    .string()
    .refine((v) => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
      message: "Digite SIM ou NÃO",
    }),
});

type FormData = z.infer<typeof schema>;

export default function HistoricoMedico() {
  const { user } = useUser();
  // const [popupEnviadoAntes, setPopupEnviadoAntes] = useState(false);
  const [popupEnviadoAgora, setPopupEnviadoAgora] = useState(false);
  const [show, setShow] = useState(true);

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
      tratamentoHistorico: data.tratamento.toUpperCase() === "SIM" ? 1 : 0,
      canalHistorico: data.canal.toUpperCase() === "SIM" ? 1 : 0,
      limpezaHistorico: data.limpeza.toUpperCase() === "SIM" ? 1 : 0,
      carieHistorico: 0,
      ortodonticoHistorico: data.aparelho.toUpperCase() === "SIM" ? 1 : 0,
      cirurgiaHistorico: data.cirurgia.toUpperCase() === "SIM" ? 1 : 0,
    };

    try {
      await axios.post(
        `http://${API.BASE_URL}/historico/inserir/${user.cpfUser}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setPopupEnviadoAgora(true);

      setTimeout(() => {
        setPopupEnviadoAgora(false);
        router.push("/login");
        Alert.alert("Cadastro realizado com sucesso 🍾", "Voltando á tela de login!");
      }, 3000);
    } catch (error: any) {
      console.error("Erro ao enviar histórico:", error);
      Alert.alert(
        "Erro",
        "Não foi possível enviar o histórico. Tente novamente."
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center pt-12 px-4">
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
              oferecer orientações mais relevantes para você.
            </Text>

            <Text className="mt-3 text-gray-600">
              O preenchimento é simples e rápido.
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
      <StatusBar style="auto" />

      {/* <Modal transparent animationType="fade" visible={popupEnviadoAntes}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
            <Text className="text-blue-700 font-extrabold text-2xl text-center">
              INFORMAÇÕES JÁ ENVIADAS
            </Text>
            <Feather
              name="check-circle"
              size={60}
              color="limegreen"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </Modal> */}

      {/* <Modal transparent animationType="fade" visible={popupEnviadoAgora}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
            <Text className="text-blue-700 font-extrabold text-2xl text-center">
              ENVIO REALIZADO COM SUCESSO!
            </Text>
            <Feather
              name="check-circle"
              size={60}
              color="limegreen"
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </Modal> */}

      <Text className="text-[#003EA6] text-3xl font-bold mb-6">
        Histórico Médico
      </Text>

      <View className="w-full mb-4">
        <Text className="text-[#003EA6] text-base mb-1">
          Já realizou tratamento?
        </Text>
        <Controller
          control={control}
          name="tratamento"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-blue-700 rounded-lg px-4 py-2 text-base bg-white text-black"
              placeholder="Digite SIM ou NÃO"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />
        {errors.tratamento && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.tratamento.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-4">
        <Text className="text-[#003EA6] text-base mb-1">
          Já realizou canal?
        </Text>
        <Controller
          control={control}
          name="canal"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-blue-700 rounded-lg px-4 py-2 text-base bg-white text-black"
              placeholder="Digite SIM ou NÃO"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />
        {errors.canal && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.canal.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-4">
        <Text className="text-[#003EA6] text-base mb-1">
          Já realizou limpeza?
        </Text>
        <Controller
          control={control}
          name="limpeza"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-blue-700 rounded-lg px-4 py-2 text-base bg-white text-black"
              placeholder="Digite SIM ou NÃO"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />
        {errors.limpeza && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.limpeza.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-4">
        <Text className="text-[#003EA6] text-base mb-1">
          Já colocou aparelho ortodôntico?
        </Text>
        <Controller
          control={control}
          name="aparelho"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-blue-700 rounded-lg px-4 py-2 text-base bg-white text-black"
              placeholder="Digite SIM ou NÃO"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />
        {errors.aparelho && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.aparelho.message}
          </Text>
        )}
      </View>

      <View className="w-full mb-4">
        <Text className="text-[#003EA6] text-base mb-1">
          Já realizou alguma cirurgia?
        </Text>
        <Controller
          control={control}
          name="cirurgia"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="border border-blue-700 rounded-lg px-4 py-2 text-base bg-white text-black"
              placeholder="Digite SIM ou NÃO"
              value={value}
              onChangeText={onChange}
              autoCapitalize="characters"
            />
          )}
        />
        {errors.cirurgia && (
          <Text className="text-red-500 text-xs mt-1">
            {errors.cirurgia.message}
          </Text>
        )}
      </View>

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
