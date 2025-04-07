import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataCalendario } from '../../components/DataCalendario';
import { Pacientes } from '../../components/pacientes';

export default function tela_principal() {
  return (
    <SafeAreaView className='bg-primary h-full w-full flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='items-center pt-6'>

          <View className='flex-row items-center mb-6'>
            <Image source={require('../../assets/Guy 2.png')} className='w-28 h-28 mr-4' />
            <View className='justify-center'>
              <Text className='font-semibold text-white text-3xl'>Olá, Dr. João</Text>
              <Text className='font-semibold text-white text-xl'>CRM 1234</Text>
            </View>
          </View>


          <View className='flex-row gap-5 mb-6'>
            <DataCalendario data={7} mes='ABR' />
            <DataCalendario data={8} mes='ABR' />
            <DataCalendario data={9} mes='ABR' />

          </View>

          <View className='w-full px-6 gap-4'>
            <Pacientes imagem={require('../../assets/person-medic.png')} hours='18:00 PM' exame='EXAME DE ROTINA' nome='JUNIOR RODRIGUES' />
            <Pacientes imagem={require('../../assets/person-medic.png')} hours='18:00 PM' exame='LIMPEZA' nome='JORGE ALMEIDA' />
            <Pacientes imagem={require('../../assets/Woman 3.png')} hours='18:00 PM' exame='EXAME DE ROTINA' nome='VANESSA ALMEIDA' />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
