import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { router } from "expo-router";

type AllpontuacoesType = {          // veio como []
  cpfUser: string;                  // "69220107015"
  dataNascimentoUser: string;       // "2025-10-14" (ISO date em string)
  emailUser: string;                // "igor@exemplo.com"
  endereco: unknown | null;         // null no exemplo              // [[Object], [Object]] no exemplo
  nomeUser: string;                 // "igor"
  nota: number;                     // 0
  planoUser: string;                // "PREMIUM"
  pontos: number;                   // 1
  sequenciaDias: number;            // 1
  sobrenomeUser: string;            // "gabriel"
  telefoneUser: string;        
}

export default function Usuario(){

const { user } = useUser();
const [score, setScore] = useState(0);
const [allpontuacoes, setAllpontuacoes] = useState<AllpontuacoesType[]>([]);
const [pontuacaoUser, setPontuacaoUser] = useState();
const [notaUser, setNotaUser] = useState(0)
const [loading, setLoading] = useState(true);
const [visible, setVisible] = useState(false); 

const imagensPerfil = [
  require('../../assets/Woman 3.png'),
  require('../../assets/Woman 3.png'),
  require('../../assets/Woman 4.png'),
]


useEffect(() => {
const fetchPontuacoesCpf = async () => {
  try {
    const response = await axios.get(`http://192.168.15.8:8080/usuario/cpf/69220107015`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNotaUser(response.data.nota)
    setPontuacaoUser(response.data.pontos)
    console.log("Nota  ",notaUser)
  } catch (error) {
    console.error("Erro ao buscar pontuação do usuário: ", error)
  }
};
fetchPontuacoesCpf

const fetchPontuacoes = async () => {

  try {
    const response = await axios.get<AllpontuacoesType[]>(`http://192.168.15.8:8080/usuario/todos`, {
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

  <SafeAreaView className="flew-1 bg-white px-4 justify-center items-center gap-4">
    <View className="items-center mt-4">

      <Text className="text-blue-700 font-bold text-2xl mt-6 mb-2">SUA PONTUAÇÃO</Text>

      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
        <Image
          source={require('../../assets/trophy.png')}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
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
      {allpontuacoes.sort((a, b) => b.pontos - a.pontos).map((user, index) => (
        <View key={user.cpfUser} className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 h-24 ">
        
            <View className="flex-row items-center gap-4 space-x-3">
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