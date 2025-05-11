import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarioOfensiva } from '../components/calendarioOfensivas'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

const Ofensiva = () => {

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
