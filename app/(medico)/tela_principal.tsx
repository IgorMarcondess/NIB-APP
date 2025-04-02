import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataCalendario } from '../../components/DataCalendario'
import { Pacientes } from '../../components/pacientes'

export default function tela_principal() {
    return (
        <SafeAreaView className='bg-primary h-full w-auto flex-1' >
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className='flex justify-center items-center'>
                    <View className='flex-row gap-8'>
                         <Image source={require('../../assets/person-medic.png')} className='w-28 h-28' /> 
                         <View className='flex-column justify-center items-center'>
                            <Text className="font-semibold color-white text-3xl">Olá, Dr. João</Text>
                            <Text className="font-semibold color-white text-xl">CRM 1234</Text>
                         </View>
                    </View>
                    <View className='flex-row gap-5 mt-24' >
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



