import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Link } from 'expo-router'

const Index = () => {
  return (
    <View>
      <Text>Index</Text>
      <Link push href="/tela2">IR PARA TELA 2</Link>
      <StatusBar style='auto'/>
    </View>
  )
}

export default Index