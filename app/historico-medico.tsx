import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Input } from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../components/userContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  tratamento: z.string().refine(v => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
    message: "Digite SIM ou NÃO"
  }),
  canal: z.string().refine(v => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
    message: "Digite SIM ou NÃO"
  }),
  limpeza: z.string().refine(v => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
    message: "Digite SIM ou NÃO"
  }),
  aparelho: z.string().refine(v => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
    message: "Digite SIM ou NÃO"
  }),
  cirurgia: z.string().refine(v => ["SIM", "NAO", "NÃO"].includes(v.toUpperCase()), {
    message: "Digite SIM ou NÃO"
  })
});

type FormData = z.infer<typeof schema>;

export default function HistoricoMedico() {
  const { user } = useUser();
  const [informacoesEnviadas, setInformacoesEnviadas] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const verificarInformacoesEnviadas = async () => {
      if (!user?.emailUser) return;
      const dadosExistente = await AsyncStorage.getItem(user.emailUser);
      const objetoDados = dadosExistente ? JSON.parse(dadosExistente) : {};
      if (objetoDados.historicoMedico === true) {
        setInformacoesEnviadas(true);
        setTimeout(() => router.push("./initial"), 3000);
      }
    };
    verificarInformacoesEnviadas();
  }, [user?.emailUser]);

  const onSubmit = async (data: FormData) => {
    if (!user?.emailUser) {
      Alert.alert("Erro", "Email do usuário não disponível.");
      return;
    }

    const dadosExistente = await AsyncStorage.getItem(user.emailUser);
    const objetoDados = dadosExistente ? JSON.parse(dadosExistente) : {};

    objetoDados.historicoMedico = true;
    await AsyncStorage.setItem(user.emailUser, JSON.stringify(objetoDados));
    setInformacoesEnviadas(true);

    setTimeout(() => router.push("./initial"), 3000);
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-white w-full h-full pt-12">
      {informacoesEnviadas && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black/50 z-50">
          <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
            <Text className="text-blue-700 font-extrabold text-2xl text-center">
              Informações Médicas já enviadas
            </Text>
            <Feather name="check-circle" size={60} color="limegreen" className="mt-4" />
          </View>
        </View>
      )}

      <View className="flex-1 items-center">
        <Text className="text-[#003EA6] text-3xl font-bold mb-4">Histórico Médico</Text>

        {([
          { label: "Já realizou tratamento?", name: "tratamento" },
          { label: "Já realizou canal?", name: "canal" },
          { label: "Já realizou limpeza?", name: "limpeza" },
          { label: "Já colocou aparelho ortodôntico?", name: "aparelho" },
          { label: "Já realizou alguma cirurgia?", name: "cirurgia" }
        ] as const).map(({ label, name }) => (
          <View key={name} className="w-full items-center">
            <Text className="text-[#003EA6] text-lg mt-2 mb-2">{label}</Text>
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <Input
                  text="SIM OU NÃO"
                  imagem={<Feather name="calendar" size={20} color="blue" />}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors[name] && <Text className="text-red-500 text-xs mb-1">{errors[name]?.message}</Text>}
          </View>
        ))}

        <View className="flex-row items-center gap-16">
          <Link push href="/initial" asChild>
            <TouchableOpacity className="bg-primary py-3 px-8 rounded-full items-center justify-center mt-5">
              <Text className="text-white text-lg font-bold">Voltar</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="bg-primary py-3 px-8 rounded-full items-center justify-center mt-6"
          >
            <Text className="text-white text-lg font-bold">Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
