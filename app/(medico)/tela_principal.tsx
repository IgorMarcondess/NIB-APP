import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DataCalendario } from '../../components/DataCalendario'

export default function tela_principal() {
    return (
        <SafeAreaView className='bg-primary h-full flex justify-center items-center' >
            <View className='flex-row gap-5'>
            <DataCalendario/>
            <DataCalendario/>
            </View>
        </SafeAreaView>
    )
}



