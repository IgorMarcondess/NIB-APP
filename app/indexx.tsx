import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, View } from 'react-native'

const Indexx = () => {
    return (
        <View>
            <Text>Index</Text>
            <Link push href="/Conta">IR PARA TELA 2</Link>
            <StatusBar style='auto' />
        </View>
    )
}

export default Indexx