import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { router } from "expo-router";
import { API } from "../../src/constants";

type AllpontuacoesType = { 
  cpfUser: string; 
  dataNascimentoUser: string;
  emailUser: string; 
  endereco: unknown | null;
  nomeUser: string; 
  nota: number; 
  planoUser: string;                
  pontos: number;                   
  sequenciaDias: number;            
  sobrenomeUser: string;            
  telefoneUser: string;        
}

export default function Usuario(){
const [allpontuacoes, setAllpontuacoes] = useState<AllpontuacoesType[]>([]);
const [pontuacaoUser, setPontuacaoUser] = useState();
const [notaUser, setNotaUser] = useState(0)
const [visible, setVisible] = useState(false); 
const { user } = useUser()

const imagensPerfil = [
  require('../../assets/Woman 3.png'),
  require('../../assets/Woman 3.png'),
  require('../../assets/Woman 4.png'),
]


useEffect(() => {
const fetchPontuacoesCpf = async () => {
  try {
    const response = await axios.get(`http://${API.BASE_URL}/usuario/cpf/${user?.cpfUser}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNotaUser(response.data.nota)
    setPontuacaoUser(response.data.pontos)
  } catch (error) {
    console.error("Erro ao buscar pontuação do usuário: ", error)
  }
};
fetchPontuacoesCpf

const fetchPontuacoes = async () => {

  try {
    const response = await axios.get<AllpontuacoesType[]>(`http://${API.BASE_URL}/usuario/todos`, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    setAllpontuacoes(response.data)
  } catch (error) {
    console.error("Erro ao buscar pontuações de todos os usuários:", error);
  }
};
fetchPontuacoes()

}, []);

function imagemAleatoria() {
  const index = Math.floor(Math.random() * imagensPerfil.length);
  return imagensPerfil[index];
}


return(

  <SafeAreaView className="flex-1 bg-white px-4 justify-center items-center gap-4">
    <View className="items-center mt-4">

      <Text className="text-blue-700 font-bold text-2xl mt-6 mb-2">SUA PONTUAÇÃO</Text>

      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
        <Image source={require('../../assets/trophy.png')}className="w-5 h-5 mr-2"resizeMode="contain"/>
        <Text className="text-blue-700 font-bold text-xl">{pontuacaoUser ?? 0}</Text>
      </View>
    </View>

    <View className="items-center justify-center mb-6">
      <View className="flex flex-row justify-center items-center gap-2">
      <Text className="text-blue-700 font-bold text-xl">NOTA</Text>
        <TouchableOpacity onPress={() => setVisible(!visible)} className="w-6 h-6  bg-blue-700 rounded-full items-center justify-center">
          <Text className="text-white font-bold">?</Text>
        </TouchableOpacity>
      </View>    
        <Text className="font-bold text-4xl">{notaUser}</Text>
    </View>

    <View className=" bg-[#dee2e6] w-96 h-[38rem] rounded-xl p-5 gap-2 ">
      <View className="items-center">
      <Text className="text-blue-700 font-extrabold text-xl mb-2">RANKING</Text>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24 }} showsVerticalScrollIndicator>
      <View className="gap-4">
      {allpontuacoes.sort((a, b) => b.pontos - a.pontos).map((user, index) => (
        <View key={user.cpfUser} className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 h-24">
        
            <View className="flex-row items-center space-x-3 gap-4">
              <View className="w-10 h-10 bg-blue-700 rounded-full items-center justify-center">
                <Text className="text-white font-extrabold text-xl">{index + 1}</Text>
              </View>
              <View className="rounded-full items-center justify-center">
                <Image source={imagemAleatoria()} className="font-bold w-17 h-18"/>
              </View>
            </View>

            <View className="items-center">
            <Text className="text-lm font-bold">{user.nomeUser.toUpperCase()}</Text>
            <Text className="text-blue-800 font-extrabold text-xl">{user.pontos} PTS</Text>
            </View>
        </View>
      ))}
      </View>
      </ScrollView>
    </View>

    <TouchableOpacity onPress={() => router.push("/initial")} className="bg-primary py-3 px-8 rounded-full">
      <Text className="text-white text-lg font-bold">Voltar</Text>
    </TouchableOpacity>

    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 bg-black/50 items-center justify-center px-4">
        <View className="bg-white w-full rounded-3xl p-6 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-extrabold text-center text-blue-800 mb-6">
              COMO GANHAR MAIS PONTOS
            </Text>

            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                ESCOVE MAIS OS DENTES
              </Text>
              <Text className="text-gray-600">
                Escove mais os dentes e registre mais no aplicativo.
              </Text>
            </View>

            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                PASSE MAIS FIO DENTAL
              </Text>
              <Text className="text-gray-600">
                Passe mais o fio dental para limpar de forma mais excelente e registre no aplicativo.
              </Text>
            </View>

            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                NÃO SE ESQUEÇA DE ENVIAR A SELFIE
              </Text>
              <Text className="text-gray-600">
                Envie a selfie com boa iluminação e boa qualidade para que nossa IA contabilize seus pontos e notas..
              </Text>
            </View>

            <TouchableOpacity onPress={() => setVisible(!visible)} className="bg-blue-700 py-3 rounded-2xl" >
              <Text className="text-white text-center font-bold text-lg">
                FECHAR
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
)}