import React from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataCalendario } from '../../components/DataCalendario'
import { Pacientes } from '../../components/pacientes'

export default function tela_principal() {
    return (
        <SafeAreaView className='bg-primary h-full flex-1 p-4' >
            <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent:'center', alignItems:'center'}}>
            <View className='flex justify-center items-center'>
            <View className='flex-row gap-5'>
                <DataCalendario />
                <DataCalendario />
            </View>
            <View>
                <Pacientes />
            </View>
            </View>
            </ScrollView>    
        </SafeAreaView>
    )
}



