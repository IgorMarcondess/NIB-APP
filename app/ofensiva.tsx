import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarOfensiva } from '../components/calendarOfensiva'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { Link, router } from 'expo-router'

const Ofensiva = () => {

    const dadosHabitos = {
        "2025-02-01": [
          { nome: "Escovação", feito: true },
          { nome: "Fio dental", feito: false },
        ],
        // "2025-04-02": [
        //   { nome: "Escovação", feito: true },
        //   { nome: "Bochecho", feito: true },
        // ],
        // "2025-04-30": [
        //   { nome: "Escovação", feito: true },
        //   { nome: "Fio dental", feito: true },
        //   { nome: "Enxaguante", feito: false },
        // ],
        // "2025-04-24": [
        //   { nome: "Escovação", feito: false },
        //   { nome: "Fio dental", feito: false },
        // ],
        // "2025-04-05": [
        //   { nome: "Escovação", feito: true },
        //   { nome: "Enxaguante", feito: true },
        // ],
        // "2025-04-15": [
        //   { nome: "Língua", feito: true },
        //   { nome: "Bochecho", feito: false },
        // ],
        // "2025-04-21": [
        //   { nome: "Escovação", feito: true },
        //   { nome: "Fio dental", feito: true },
        //   { nome: "Bochecho", feito: true },
        // ],
      };
      
      const dadosHabitos1 = {
        "2025-04-02": [
          { nome: "Escovação", feito: false },
          { nome: "Fio dental", feito: false },
          { nome: "Língua", feito: false },
        ],
        "2025-04-17": [
          { nome: "Escovação", feito: true },
          { nome: "Enxaguante", feito: true },
        ],
        "2025-04-26": [
          { nome: "Bochecho", feito: true },
          { nome: "Língua", feito: true },
        ],
        "2025-04-24": [
          { nome: "Escovação", feito: true },
          { nome: "Fio dental", feito: false },
          { nome: "Enxaguante", feito: true },
        ],
        "2025-04-12": [
          { nome: "Bochecho", feito: false },
        ],
        "2025-04-13": [
          { nome: "Escovação", feito: true },
          { nome: "Língua", feito: true },
        ],
        "2025-04-14": [
          { nome: "Fio dental", feito: true },
          { nome: "Bochecho", feito: false },
        ],
      };
      

    return (
<SafeAreaView className="flex-1 bg-white p-4 justify-between">
        <ScrollView>
            <View className="space-y-4">
                <CalendarOfensiva
                    titulo="Fevereiro"
                    ofensiva={15}
                    habitos={dadosHabitos}
                />
                <CalendarOfensiva
                    titulo="Janeiro"
                    ofensiva={25}
                    habitos={dadosHabitos1}
                />

            </View>

            <View className='justify-center items-center'>
            <Link push href="/initial" asChild className=''>
                <TouchableOpacity className="bg-[#003EA6] w-44 h-16 rounded-full mt-5 justify-center items-center">
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