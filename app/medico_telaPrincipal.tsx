import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Datas from '../components/datas'

const medico_telaPrincipal = () => {
  return (
    <SafeAreaView className='bg-primary flex h-full w-auto'>
      <Datas/>
    </SafeAreaView>
  )
}

export default medico_telaPrincipal