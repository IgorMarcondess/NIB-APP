import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../services/firebase";
import { useUser } from "../../components/userContext";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

type AllpontuacoesType = {
  id: number;
  nome: string;
  pontuacao: number;
}

export default function Usuario(){

const { user } = useUser();
const [score, setScore] = useState(0);
const [allpontuacoes, setAllpontuacoes] = useState<AllpontuacoesType[]>([
  {
    id: 1,
    nome: "João Silva",
    pontuacao: 1200,
  },
  {
    id: 2,
    nome: "Maria Souza",
    pontuacao: 950,
  },
  {
    id: 3,
    nome: "Carlos Pereira",
    pontuacao: 1500,
  },
]);
const [pontuacaoUser, setPontuacaoUser] = useState({});
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

    if (!user?.idUser) return;
    const userDocs = doc(db, "usuarios", user.idUser);
    const DocUser = await getDoc(userDocs);

    if (!DocUser.exists()) {
      console.warn("Usuário não encontrado no Firestore");
      return;
      }

      const userData = DocUser.data();
      const cpf = userData.cpf; 

    if (!cpf) {
      console.warn("Usuário não possui CPF cadastrado");
      return;
    }

    const response = await axios.get(`http://192.168.15.11/usuario/cpf/?cpf=${cpf}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNotaUser(response.data.nota)
    setPontuacaoUser(response)
  } catch (error) {
    console.error("Erro ao buscar pontuação do usuário: ", error)
  }
};
fetchPontuacoesCpf();

const fetchPontuacoes = async () => {

  try {
    const response = await axios.get(`http://192.168.15.11/usuario/todos`, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    setAllpontuacoes(response.data)
  } catch (error) {
    console.error("Erro ao buscar pontuações de todos os usuários:", error);
  }
};
fetchPontuacoes();

}, [user?.idUser]);

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
          source={require('../../assets/trophy.png')} // caminho da imagem do troféu
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
        <Text className="text-blue-700 font-bold text-xl">1250 PTS</Text>
      </View>
    </View>

    <View className="items-center mb-6">
      <Text className="text-blue-700 font-bold text-xl mr-2">NOTA</Text>
      {/* Botão interrogação */}
      <TouchableOpacity onPress={() => setVisible(!visible)} className="w-6 h-6 bg-blue-700 rounded-full items-center justify-center">
        <Text className="text-white font-bold">?</Text>
      </TouchableOpacity>
      <Text className="font-bold text-4xl">{notaUser}</Text>
    </View>

    <View className=" bg-[#dee2e6] w-96 h-[38rem] rounded-xl p-5 gap-2 ">
      <View className="items-center">
      <Text className="text-blue-700 font-extrabold text-xl mb-2">RANKING</Text>
      </View>
      {allpontuacoes.sort((a, b) => b.pontuacao - a.pontuacao).map((user, index) => (
        <View className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 h-24 ">
        
            <View className="flex-row items-center gap-4 space-x-3">
              <View className="w-10 h-10 bg-blue-700 rounded-full items-center justify-center">
                <Text className="text-white font-extrabold text-xl">{index + 1}</Text>
              </View>
              <View className="rounded-full items-center justify-center">
                <Image source={imagemAleatoria()} className="font-bold w-16 h-16"/>
              </View>
            </View>

            <View className="items-center">
            <Text className="text-lm">{user.nome}</Text>
            <Text className="text-blue-800 font-extrabold text-xl">{user.pontuacao} PTS</Text>
            </View>
          </View>
      ))}
    </View>

    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onclose}>
      <View className="flex-1 bg-black/50 items-center justify-center px-4">
        <View className="bg-white w-full rounded-3xl p-6 max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-extrabold text-center text-blue-800 mb-6">
              COMO GANHAR MAIS PONTOS
            </Text>

            {/* Seção 1 */}
            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                ESCOVE MAIS OS DENTES
              </Text>
              <Text className="text-gray-600">
                Escove mais os dentes e registre mais no aplicativo.
              </Text>
            </View>

            {/* Seção 2 */}
            <View className="mb-5">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                PASSE MAIS FIO DENTAL
              </Text>
              <Text className="text-gray-600">
                Passe mais o fio dental para limpar de forma mais excelente e registre no aplicativo.
              </Text>
            </View>

            {/* Seção 3 */}
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-800 mb-1">
                NÃO SE ESQUEÇA DE ENVIAR A SELFIE
              </Text>
              <Text className="text-gray-600">
                Envie a selfie com boa iluminação e boa qualidade para que nossa IA contabilize seus pontos e notas..
              </Text>
            </View>

            {/* Botão Fechar */}
            <TouchableOpacity onPress={onclose} className="bg-blue-700 py-3 rounded-2xl" >
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