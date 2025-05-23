import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { doc, getDoc } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { db } from "../services/firebase";
import { useUser } from "./userContext";

const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

type MarkedDates = Record<string, { selected: boolean; selectedColor: string }>;

export const CalendarioOfensiva = () => {
  const { user } = useUser();
  const [dadosPorMes, setDadosPorMes] = useState<Record<string, MarkedDates>>({});
  const [visibilidade, setVisibilidade] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const carregarDados = async () => {
      if (!user?.idUser) {
        console.log("Id do usuário não encontrado!");
        return;
      }

      const docRef = doc(db, "usuarios", user.idUser);
      const docsUsuario = await getDoc(docRef);

      if (!docsUsuario.exists()) {
        console.log("Docs do usuário não encontrado");
        return;
      }

      const dados = docsUsuario.data();
      const resultado: Record<string, MarkedDates> = {};
      const vis: Record<string, boolean> = {};
      const ano = new Date().getFullYear();

      meses.forEach((mes) => {
        if (dados[mes]) {
          const dias = Object.keys(dados[mes]);
          const markedDates: MarkedDates = {};
          const indiceMes = meses.indexOf(mes)

          dias.forEach((dia) => {
            const dataFormatada = formatarData(ano, indiceMes, dia);
            markedDates[dataFormatada] = {
              selected: true,
              selectedColor: "blue"
            };
          });

          resultado[mes] = markedDates;
          vis[mes] = false;
        }
      });

      setDadosPorMes(resultado);
      setVisibilidade(vis);
    };

    carregarDados();
  }, [user?.idUser]);

  const formatarData = (ano: number, indiceMes: number, dia: string): string => {
    const mesNum = String(indiceMes + 1).padStart(2, "0");
    const diaNum = String(dia).padStart(2, "0");
    return `${ano}-${mesNum}-${diaNum}`;
  };

  const alternarVisibilidade = (mes: string) => {
    setVisibilidade((prev) => ({ ...prev, [mes]: !prev[mes] }));
  };

  const calcularPontuacao = (mes: string): number => {
    return Object.keys(dadosPorMes[mes] || {}).length;
  };

  const obterMedalha = (pontuacao: number) => {
    if (pontuacao > 20) return require("../assets/Ouro.png");
    if (pontuacao > 10) return require("../assets/Prata.png");
    return require("../assets/Bronze.png");
  };

  return (
    <View className="p-4">
      {Object.entries(dadosPorMes).map(([mes, diasMarcados]) => {
        const pontuacao = calcularPontuacao(mes);
        const mostrar = visibilidade[mes];
 
        return (
          <View key={mes} className="mb-6">
            <TouchableOpacity  className="flex-row justify-between items-center bg-gray-300 rounded-2xl p-4 h-20" onPress={() => alternarVisibilidade(mes)}>
              <View className="flex-row items-center">
                <Text className="text-blue-700 font-extrabold text-2xl capitalize">{mes}</Text>
                <Image source={obterMedalha(pontuacao)} className="w-6 h-6 ml-2" />
              </View>
              <Feather name={mostrar ? "chevron-up" : "chevron-down"} size={20}color="black"/>
            </TouchableOpacity>

            {mostrar && (
              <Calendar
                current={`2025-${String(meses.indexOf(mes) + 1).padStart(2, "0")}-01`}
                markedDates={diasMarcados}
                hideExtraDays
                theme={{
                  todayTextColor: "blue",
                  selectedDayBackgroundColor: "blue",
                  selectedDayTextColor: "#fff",
                  textMonthFontWeight: "bold",
                  textDayFontWeight: "500",
                  textMonthFontSize: 14,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
