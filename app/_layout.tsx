import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../global.css"
import { Slot } from 'expo-router'
const RootLayout = () => {
  return (
    <View>
      <SafeAreaView>
      <Text className='text-5xl bg-red-600'>testo a</Text>
      <StatusBar style='dark'/>
      <Slot />
      </SafeAreaView>
    </View>
  )
}

export default RootLayout