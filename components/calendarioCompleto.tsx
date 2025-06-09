import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "./userContext";

const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho","julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

export const CalendarioCompleto = () => {
  const { user } = useUser();
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [mesAtual, setMesAtual] = useState("");

  useEffect(() => {
    const carregarDadosDoMesAtual = async () => {
      if (!user?.idUser) {
        console.log("Id do user não existe!");
        return;
      }

      const hoje = new Date();
      const mesIndex = hoje.getMonth();
      const mes = meses[mesIndex];
      const ano = hoje.getFullYear();
      const DadosUser = doc(db, "usuarios", user.idUser);
      const docsUsuario = await getDoc(DadosUser);

      if (docsUsuario.exists()) {
        const dados = docsUsuario.data();
        const marcacoes: Record<string, any> = {};

        if (dados[mes]) {
          for (const dia in dados[mes]) {
            const dataFormatada = formatarData(ano, dia);
            marcacoes[dataFormatada] = {
              selected: true,
              selectedColor: "blue"
            };
          }

          setMarkedDates(marcacoes);
          setMesAtual(mes);
        }
      }
    };

    carregarDadosDoMesAtual();
  }, [user?.idUser]);

  const formatarData = (ano: number, dia: string): string => {
    const hoje = new Date();
    const mesIndex = hoje.getMonth();
    const mesNum = String(mesIndex + 1).padStart(2, "0");
    const diaNum = String(dia).padStart(2, "0");
    return `${ano}-${mesNum}-${diaNum}`; //tem q enviar como string para o Calendar kk
  };

  return (
    <View className="p-4">
      <Text className="text-blue-700 font-bold text-xl mb-2 capitalize">
        {mesAtual}
      </Text>
      <Calendar
        markedDates={markedDates}
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
    </View>
  );
};
