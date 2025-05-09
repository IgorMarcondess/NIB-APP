import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "./userContext";

const MESES_PT_BR = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

export const CalendarioCompleto = () => {
  const { user } = useUser();
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [mesAtual, setMesAtual] = useState<string>("");

  useEffect(() => {
    const carregarDadosDoMesAtual = async () => {
      if (!user?.idUser) return;

      const hoje = new Date();
      const mes = MESES_PT_BR[hoje.getMonth()]; // Ex: "maio"
      const ano = hoje.getFullYear();
      const docRef = doc(db, "usuarios", user.idUser);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dados = docSnap.data();
        const marcacoes: Record<string, any> = {};

        if (dados[mes]) {
          const dias = Object.keys(dados[mes]);
          dias.forEach((dia) => {
            const dataFormatada = formatarData(ano, mes, dia);
            marcacoes[dataFormatada] = {
              selected: true,
              selectedColor: "blue"
            };
          });

          setMarkedDates(marcacoes);
          setMesAtual(mes);
        }
      }
    };

    carregarDadosDoMesAtual();
  }, [user?.idUser]);

  const formatarData = (ano: number, mes: string, dia: string): string => {
    const indexMes = MESES_PT_BR.indexOf(mes.toLowerCase());
    const mesNum = String(indexMes + 1).padStart(2, "0");
    const diaNum = String(dia).padStart(2, "0");
    return `${ano}-${mesNum}-${diaNum}`;
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
