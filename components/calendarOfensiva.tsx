import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";

type DatasMarcadasOfensiv = Record<string, { nome: string; feito: boolean }[]>;
type AvaliacaoProps = {
  ofensiva?: number;
  titulo?: string;
  habitos?: DatasMarcadasOfensiv;
};

export const CalendarOfensiva = ({
  ofensiva = 5,
  titulo,
  habitos,
}: AvaliacaoProps) => {
  const [mostrarAvaliacoes, setMostrarAvaliacoes] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const markedDates: Record<string, any> = {};
  let datas = habitos ? Object.keys(habitos) : [];

  datas.forEach((data) => {
    markedDates[data] = {
      selected: true,
      selectedColor: "blue",
    };
  });

  const minDate = datas.length > 0 ? datas.sort()[0] : undefined;
  const maxDate = datas.length > 0 ? datas.sort().reverse()[0] : undefined;

  return (
    <View className="p-4">
      <TouchableOpacity
        onPress={() => setMostrarAvaliacoes(!mostrarAvaliacoes)}
        className="flex-row justify-between items-center bg-gray-300 rounded-2xl p-4 h-20"
      >
        <View className="flex-row items-center">
          <Text className="text-blue-700 font-extrabold text-2xl">{titulo}</Text>
          <View className="ml-2">
            {ofensiva > 20 ? (
              <Image source={require("../assets/Ouro.png")} className="w-6 h-6" />
            ) : ofensiva > 10 ? (
              <Image source={require("../assets/Prata.png")} className="w-6 h-6" />
            ) : (
              <Image source={require("../assets/Bronze.png")} className="w-6 h-6" />
            )}
          </View>
        </View>
        {mostrarAvaliacoes ? (
          <Feather name="chevron-up" size={20} color="black" />
        ) : (
          <Feather name="chevron-down" size={20} color="black" />
        )}
      </TouchableOpacity>

      {mostrarAvaliacoes && (
        <View className="bg-white p-3 rounded-2xl mt-2 items-center">
          <Text className="text-blue-700 font-bold text-md mb-2">
            AVALIAÇÕES DIÁRIAS
          </Text>

          <Calendar
            initialDate={minDate}
            onDayPress={(day: any) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            minDate={minDate}
            maxDate={maxDate}
            disableArrowLeft={true}
            disableArrowRight={true}
            hideExtraDays={true}
            theme={{
              todayTextColor: "blue",
              arrowColor: "black",
              textMonthFontWeight: "bold",
              textDayFontWeight: "500",
              selectedDayBackgroundColor: "blue",
              selectedDayTextColor: "#fff",
              textMonthFontSize: 12,
            }}
          />

          <Text className="text-center text-blue-700 font-bold text-lg mt-3">
            {selectedDate ? "Hábitos realizados" : "Selecione uma data"}
          </Text>

          <View className="flex-row items-center gap-6 mt-3">
            {habitos?.[selectedDate] ? (
              habitos[selectedDate].map((habito) => (
                <View key={habito.nome} className="flex-row items-center">
                  <Text className="text-blue-700 font-semibold mr-0.5">
                    {habito.nome}
                  </Text>
                  <Feather
                    name="check"
                    size={18}
                    color={habito.feito ? "green" : "gray"}
                  />
                </View>
              ))
            ) : (
              <Text className="text-gray-400 italic">
                Sem hábitos cadastrados para essa data
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
