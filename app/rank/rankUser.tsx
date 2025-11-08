import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../components/userContext";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
};

export default function Usuario() {
  const [allpontuacoes, setAllpontuacoes] = useState<AllpontuacoesType[]>([]);
  const [pontuacaoUser, setPontuacaoUser] = useState<number | undefined>();
  const [notaUser, setNotaUser] = useState(0);
  const [visible, setVisible] = useState(false);
  const { user } = useUser();

  const imagensPerfil = [
    require("../../assets/Woman 3.png"),
    require("../../assets/Woman 3.png"),
    require("../../assets/Woman 4.png"),
  ];
  function imagemAleatoria() {
    const index = Math.floor(Math.random() * imagensPerfil.length);
    return imagensPerfil[index];
  }

  useEffect(() => {
    const fetchPontuacoesCpf = async () => {
      try {
        const response = await axios.get(
          `http://${API.BASE_URL}/usuario/cpf/${user?.cpfUser}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setNotaUser(response.data.nota);
        setPontuacaoUser(response.data.pontos);
      } catch (error) {
        console.error("Erro ao buscar pontuação do usuário: ", error);
      }
    };

    const fetchPontuacoes = async () => {
      try {
        const response = await axios.get<AllpontuacoesType[]>(
          `http://${API.BASE_URL}/usuario/todos`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAllpontuacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontuações de todos os usuários:", error);
      }
    };

    if (user?.cpfUser) {
      fetchPontuacoesCpf();
      fetchPontuacoes();
    }
  }, [user?.cpfUser]);


  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Scroll geral da tela toda */}
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 24,
          paddingTop: 16,
          gap: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Bloco pontuação */}
        <View className="items-center">
          <Text className="text-blue-700 font-bold text-2xl mb-2">
            SUA PONTUAÇÃO
          </Text>

          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
            <Image
              source={require("../../assets/trophy.png")}
              className="w-5 h-5 mr-2"
              resizeMode="contain"
            />
            <Text className="text-blue-700 font-bold text-xl">
              {pontuacaoUser ?? 0}
            </Text>
          </View>
        </View>

        {/* Bloco nota */}
        <View className="items-center">
          <View className="flex flex-row justify-center items-center gap-2">
            <Text className="text-blue-700 font-bold text-xl">NOTA</Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="w-6 h-6 bg-blue-700 rounded-full items-center justify-center"
            >
              <Text className="text-white font-bold">?</Text>
            </TouchableOpacity>
          </View>
          <Text className="font-bold text-4xl">{notaUser}</Text>
        </View>

        {/* Ranking */}
        <View className="w-full max-w-[384px] bg-[#dee2e6] rounded-xl p-5">
          <View className="items-center mb-2">
            <Text className="text-blue-700 font-extrabold text-xl">
              RANKING
            </Text>
          </View>

          {/* Scroll interno só da lista */}
          <View className="max-h-[400px]">
            <ScrollView
              nestedScrollEnabled={true} // ✅ permite dois ScrollViews funcionarem juntos
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 24,
                rowGap: 16,
              }}
              showsVerticalScrollIndicator={true}
            >
              {allpontuacoes
                .sort((a, b) => b.pontos - a.pontos)
                .map((u, index) => (
                  <View
                    key={u.cpfUser || index}
                    className="flex-row items-center justify-between bg-white rounded-2xl px-4 py-3 h-24"
                  >
                    {/* ESQUERDA: posição + avatar */}
                    <View className="flex-row items-center gap-4">
                      <View className="w-10 h-10 bg-blue-700 rounded-full items-center justify-center">
                        <Text className="text-white font-extrabold text-xl">{index + 1}</Text>
                      </View>

                      <View className="rounded-full items-center justify-center overflow-hidden w-12 h-12 bg-gray-200">
                        <Image source={imagemAleatoria()} className="w-12 h-12" resizeMode="cover" />
                      </View>
                    </View>

                    {/* MEIO: PONTOS (agora à esquerda do nome) */}
                    <Text className="text-blue-800 font-extrabold text-xl mx-2 w-20 text-center">
                      {u.pontos} PTS
                    </Text>

                    {/* DIREITA: NOME (no mesmo lugar de antes) */}
                    <View className="flex-1 items-end min-w-0">
                      <Text
                        className="text-base text-blue-800 font-bold text-right max-w-[160px]"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {u.nomeUser?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Botão voltar */}
        <TouchableOpacity
          onPress={() => router.push("/initial")}
          className="bg-blue-700 py-3 px-8 rounded-full"
        >
          <Text className="text-white text-lg font-bold">Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal ajuda pontuação */}
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View className="flex-1 bg-black/50 items-center justify-center px-4">
          <View className="bg-white w-full rounded-3xl p-6 max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="text-2xl font-extrabold text-center text-blue-800 mb-6">
                Como aumentar minha nota?🤔
              </Text>
              <View className="mb-8">
                <Text className="text-lg font-bold text-gray-800 mb-1">
                  ENVIE SEUS REGISTROS TODOS OS DIAS
                </Text>
                <Text className="text-gray-600">
                  Quão maior a sequência de dias enviando registros, maior será
                  sua nota!
                </Text>
              </View>

              <View className="mb-5">
                <Text className="text-lg font-bold text-gray-800 mb-1">
                  ESCOVE MAIS OS DENTES
                </Text>
                <Text className="text-gray-600">
                  Para nós, a escovação é primordial para uma boa saúde bucal.
                  Escove seus dentes mais vezes ao dia e registre no aplicativo.
                </Text>
              </View>

              <View className="mb-5">
                <Text className="text-lg font-bold text-gray-800 mb-1">
                  NÃO ESQUEÇA DO FIO DENTAL
                </Text>
                <Text className="text-gray-600">
                  Assim como a escovação, o uso do fio dental é essencial para
                  manter seus dentes e gengivas saudáveis. Use o fio dental
                  diariamente e registre seu uso no app.
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setVisible(false)}
                className="bg-blue-700 py-3 rounded-2xl"
              >
                <Text className="text-white text-center font-bold text-lg">
                  FECHAR
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
