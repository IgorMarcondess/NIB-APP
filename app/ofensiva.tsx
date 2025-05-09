import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarioOfensiva } from '../components/calendarioOfensivas'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link, router } from 'expo-router'

const Ofensiva = () => {
  const habitos2 = {
    "2025-05-01": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: true },
    ],
    "2025-05-03": [
      { nome: "Escovação", feito: false },
      { nome: "Bochecho", feito: true },
    ],
    "2025-05-05": [
      { nome: "Língua", feito: true },
      { nome: "Fio dental", feito: false },
    ],
    "2025-05-08": [
      { nome: "Escovação", feito: true },
      { nome: "Bochecho", feito: false },
      { nome: "Língua", feito: true },
    ],
    "2025-05-10": [
      { nome: "Enxaguante", feito: true },
    ],
    "2025-05-14": [
      { nome: "Escovação", feito: false },
      { nome: "Fio dental", feito: false },
      { nome: "Bochecho", feito: false },
    ],
    "2025-05-21": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: true },
      { nome: "Língua", feito: true },
    ],
  };

  const habitos1 = {
    "2025-02-02": [
      { nome: "Escovação", feito: false },
      { nome: "Fio dental", feito: false },
      { nome: "Língua", feito: false },
    ],
    "2025-02-17": [
      { nome: "Escovação", feito: true },
      { nome: "Enxaguante", feito: true },
    ],
    "2025-02-26": [
      { nome: "Bochecho", feito: true },
      { nome: "Língua", feito: true },
    ],
    "2025-02-24": [
      { nome: "Escovação", feito: true },
      { nome: "Fio dental", feito: false },
      { nome: "Enxaguante", feito: true },
    ],
    "2025-02-12": [
      { nome: "Bochecho", feito: false },
    ],
    "2025-02-13": [
      { nome: "Escovação", feito: true },
      { nome: "Língua", feito: true },
    ],
    "2025-02-14": [
      { nome: "Fio dental", feito: true },
      { nome: "Bochecho", feito: false },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4 justify-between">
      <ScrollView>
        <View className="space-y-4">
          <CalendarioOfensiva/>
        </View>

        <View className="justify-center items-center">
          <Link push href="/initial" asChild>
            <TouchableOpacity className="bg-[#003EA6] w-44 h-16 rounded-full mt-5 justify-center items-center flex-row gap-2">
              <Feather name="arrow-left" size={20} color="white" />
              <Text className="text-white text-base font-bold">Voltar</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Ofensiva
