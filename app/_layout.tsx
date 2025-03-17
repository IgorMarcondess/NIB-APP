import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import "../global.css"
const RootLayout = () => {
  return (
    <View>
      <SafeAreaView>
        <Text className='text-5xl bg-red-600'>testo b</Text>
        <StatusBar style='dark' />
        <Slot />
      </SafeAreaView>
    </View>
  )
}

export default RootLayout