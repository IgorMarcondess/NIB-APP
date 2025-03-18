import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CalendarOfensiva } from '../components/calendarOfensiva'

const Ofensiva = () => {
    return (
        <SafeAreaView>
            <CalendarOfensiva />
            <StatusBar style='auto' />
        </SafeAreaView>
    )
}

export default Ofensiva