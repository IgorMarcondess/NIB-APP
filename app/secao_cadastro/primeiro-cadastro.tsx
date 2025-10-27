import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {Alert,Image,ScrollView,Text,TouchableOpacity,View,ActivityIndicator, KeyboardAvoidingView, Platform,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../components/input";
import { useUser } from "../../components/userContext";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { db } from "../../services/firebase";
import {collection,query,where,getDocs,updateDoc,doc,} from "firebase/firestore";
import axios from "axios";


function formatarData(data: string): string {
  if (!/^\d{8}$/.test(data))
    throw new Error("Data inválida. Use o formato ddMMyyyy.");
  const dia = data.substring(0, 2);
  const mes = data.substring(2, 4);
  const ano = data.substring(4, 8);
  return `${ano}-${mes}-${dia}`;
}

const schema = z
  .object({
    nome: z.string().trim().min(3, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarsenha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    telefone: z.string().regex(/^\d{11}$/, "Telefone deve conter 11 números"),
  })
  .refine((data) => data.senha === data.confirmarsenha, {
    message: "As senhas não coincidem",
    path: ["confirmarsenha"],
  });

type FormData = z.infer<typeof schema>;



export default function primeiroCadastro() {
  const { user, setUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (!user?.cpfUser) {
        throw new Error("CPF do usuário não disponível no contexto.");
      }

      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("cpf", "==", user.cpfUser));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Usuário não encontrado no banco de dados.");
      }

      const userDoc = querySnapshot.docs[0];
      const docRef = doc(db, "usuarios", userDoc.id);

      const payloadFirebase = { nome: data.nome, email: data.email, telefone: data.telefone, plano: "PREMIUM", senha: data.senha };

      const PayloadAPI = {
        cpfUser: user.cpfUser,
        nomeUser: data.nome,
        sobrenomeUser: "none",
        telefoneUser: "119",
        dataNascimentoUser: "2025-01-01",
        planoUser: "PREMIUM",
        emailUser: data.email,
      };

      {/*POST FIREBASE*/}
      await updateDoc(docRef, { ...payloadFirebase });
      console.log("Informações enviado API - ", payloadFirebase);

      {/*POST API*/}
      await axios.patch(`http://192.168.15.8:8080/usuario/${user.cpfUser}/atualizar`, PayloadAPI);
      // await axios.patch(`/usuario/${user.cpfUser}/atualizar`, PayloadAPI);

      const novoUsuario = {
        ...PayloadAPI,
        idUser: userDoc.id
      };

      setUser(novoUsuario);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      router.push("./planoUser");
    } catch (error: any) {
      const msg = "Erro ao atualizar os dados nos múltiplos bancos de dados";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#003EA6]">
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center px-4 pb-10">
          <Image
            source={require("../../assets/logoteeth.png")}
            className="w-40 mb-5"
          />
          <Text className="text-white text-2xl font-bold mb-2">
            {" "}
            INFORMAÇÕES PESSOAIS
          </Text>
          <Text className="text-white text-lg font-bold mt-2">Nome & Sobrenome</Text>
          <Controller control={control} name="nome" render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu Nome & Sobrenome"
                imagem={<Feather name="mail" size={20} color="blue" />}
                keyboardType="name-phone-pad"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.email.message}
            </Text>
          )}

          <Text className="text-white text-lg font-bold mt-2">E-mail</Text>
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu E-mail"
                imagem={<Feather name="mail" size={20} color="blue" />}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.email.message}
            </Text>
          )}

          <Text className="text-white text-lg font-bold mt-2">Telefone</Text>
          <Controller control={control} name="telefone" render={({ field: { onChange, value } }) => (
              <Input
                text="Digite seu Telefone"
                imagem={<Feather name="phone" size={20} color="blue" />}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.telefone && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.telefone.message}
            </Text>
          )}

          <Text className="text-white text-lg font-bold mt-2">Senha</Text>
          <Controller control={control} name="senha" render={({ field: { onChange, value } }) => (
              <Input
                text="Digite sua Senha"
                imagem={<Feather name="lock" size={20} color="blue" />}
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.senha && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.senha.message}
            </Text>
          )}

          <Text className="text-white text-lg font-bold mt-2">
            Confirmar senha
          </Text>
          <Controller control={control} name="confirmarsenha" render={({ field: { onChange, value } }) => (
              <Input
                text="Digite sua Senha"
                imagem={<Feather name="lock" size={20} color="blue" />}
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.confirmarsenha && (
            <Text className="text-red-500 text-xs mb-1">
              {errors.confirmarsenha.message}
            </Text>
          )}

          <View className="flex-row justify-center items-center gap-5 mt-24">
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
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
