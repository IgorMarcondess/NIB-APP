import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUser } from "../../components/userContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  Query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { API } from "../../src/constants";

const schema = z.object({
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 números"),
});

type FormData = z.infer<typeof schema>;

export default function Localizar_cpf() {
  const { setUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const [menuAberto, setMenuAberto] = useState(false);
  const cpfOpcoes = [
    "81547430001",
    "69220107015",
    "21740955056",
    "99903676042",
    "92243812002",
  ];

  const selecionarCPF = async (cpf: string) => {
    console.log("Inicio processo!");
    setMenuAberto(false);

    const colecaoUser = query(
      collection(db, "usuarios"),
      where("cpf", "==", cpf)
    );
    const docsUser = await getDocs(colecaoUser);

    if (docsUser.empty) return;

    const ref = docsUser.docs[0].ref;
    await setDoc(ref, { cpf }, { merge: false });

<<<<<<< HEAD
    try {
<<<<<<< HEAD
      console.log("Fazendo delete HISTÓRICO");
      await axios.delete(`http://${API.BASE_URL}/historico/deletar/${cpf}`);
    } catch (error: any) {
      console.error("Erro ao limpar histórico", error);
      Alert.alert("Erro ao limpar histórico");
    }
=======
      console.log("Fazendo delete HISTÓRICO")
      await axios.delete(
        `http://${API.BASE_URL}/historico/deletar/${cpf}`,
      );
    } catch (error: any) {
        console.error("Erro ao limpar histórico", error);
        Alert.alert("Erro ao limpar histórico");
    };
>>>>>>> 695b067e59818def37e5a7d65882ef6f496f3ebe
=======
    // try {
    //   console.log("Fazendo delete HISTÓRICO")
    //   await axios.delete(
    //     `http://${API.BASE_URL}/historico/deletar/${cpf}`,
    //   );
    // } catch (error: any) {
    //     console.error("Erro ao limpar histórico", error);
    //     Alert.alert("Erro ao limpar histórico");
    // };

>>>>>>> fdc118d433430f72156b8a0eb62b9193554d6aa4

    console.log(`[Cadastro] Limpeza do Docs realizada com sucesso`);
    setUser({
      cpfUser: cpf,
      nomeUser: "",
      sobrenomeUser: "",
      telefoneUser: "",
      dataNascimentoUser: "",
      planoUser: "",
      emailUser: "",
      idUser: "",
    });

    router.push("./primeiro-cadastro");
  };

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   try {
  //     const usuariosRef = collection(db, "usuarios");
  //     const q = query(usuariosRef, where("cpf", "==", data.cpf));
  //     const querySnapshot = await getDocs(q);

  //     if (querySnapshot.empty) {
  //       Alert.alert("CPF não encontrado no Firebase");
  //       setLoading(false);
  //       return;
  //     }

  //     const firebaseDoc = querySnapshot.docs[0];
  //     const firebaseData = firebaseDoc.data();

  //     const response = await axios.get(
  //       `http://192.168.15.6:8080/usuario/cpf/${data.cpf}`
  //     );

  //     if (!response.data) {
  //       Alert.alert("CPF não encontrado na API");
  //       setLoading(false);
  //       return;
  //     }

  //     const dados = Array.isArray(response.data)? response.data[0]: response.data;

  //     const userFinal = {
  //       cpfUser: dados.cpf || firebaseData.cpf,
  //       nomeUser: dados.nome || firebaseData.nome,
  //       sobrenomeUser: dados.sobrenome || firebaseData.sobrenome ,
  //       telefoneUser: dados.telefone || firebaseData.telefone,
  //       dataNascimentoUser: dados.dataNascimento || firebaseData.dataNascimento,
  //       planoUser: dados.plano || firebaseData.plano ,
  //       emailUser: dados.email || firebaseData.email,
  //       idUser: firebaseDoc.id,
  //     };

  //     setUser(userFinal);
  //     Alert.alert("Usuário encontrado", "Seguindo para próxima tela...");
  //     router.push("/primeiro-cadastro");
  //   } catch (error: any) {
  //     Alert.alert("Erro", error.message || "Erro inesperado.");
  //   } finally {
  //     setLoading(false);
  //   }

  //   Alert.alert("CPF digitado", "Por favor escolha um dos CPFs registrados!");
  // };

  return (
    <SafeAreaView className="flex-1 bg-[#003EA6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-4 pb-10">
          <Image
            source={require("../../assets/logoteeth.png")}
            className="w-40 mb-5"
          />
          <Text className="text-white text-2xl font-bold mb-2 mt-6">
            LOCALIZAR CADASTRO
          </Text>

          {/* CÓDIGO COMENTADO - INPUT MANUAL DO CPF/}
          {/* <Text className="text-white text-lg font-medium mt-2 mb-2">
            DIGITE SEU CPF
          </Text>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <Input
                text="(Sem pontuação)"
                imagem={<Feather name="user" size={20} color="blue" />}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cpf && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.cpf.message}
            </Text>
          )} */}

          <Text className="text-white text-lg font-medium mt-4 mb-2">
            SELECIONE UM CPF
          </Text>
          <View className="w-full items-center">
            <TouchableOpacity
              className="w-80 bg-white/10 border border-white rounded-2xl px-4 py-4 mt-1 flex-row justify-between items-center"
              onPress={() => setMenuAberto((v) => !v)}
              activeOpacity={0.8}
            >
              <Text className="text-white text-base">Escolha um CPF</Text>
              <Feather
                name={menuAberto ? "chevron-up" : "chevron-down"}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            {menuAberto && (
              <View className="w-80 bg-white rounded-2xl mt-2 shadow border border-white/30">
                {cpfOpcoes.map((cpf) => (
                  <TouchableOpacity
                    key={cpf}
                    className="px-4 py-3 border-b border-gray-200"
                    onPress={() => selecionarCPF(cpf)}
                  >
                    <Text className="text-[#003EA6] font-semibold">{cpf}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Image
            source={require("../../assets/recepcao.jpg")}
            className="w-[350px] h-[300px] rounded-xl mt-10"
          />

          {/* CODIGO COMENTADO POIS N SERA MAIS NECESSSÁRIO*/}
          {/* <View className="flex-row justify-center items-center gap-5 mt-10">
            <TouchableOpacity
              className="py-3 px-8 rounded-full border-2 border-white"
              onPress={() => router.back()}
            >
              <Text className="text-white text-lg font-bold">VOLTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="py-3 px-8 rounded-full border-2 border-white flex-row items-center"
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-bold">AVANÇAR</Text>
              )}
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function deleteDocs(q: Query<DocumentData, DocumentData>) {
  throw new Error("Function not implemented.");
}
