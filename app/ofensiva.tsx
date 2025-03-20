import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarOfensiva } from '../components/calendarOfensiva'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { Link, router } from 'expo-router'

const Ofensiva = () => {
    return (
<SafeAreaView className="flex-1 bg-white p-4 justify-between">
        <ScrollView>
            <View className="space-y-4">
                <CalendarOfensiva titulo='Fevereiro'/>
                <CalendarOfensiva titulo='Março'/>
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