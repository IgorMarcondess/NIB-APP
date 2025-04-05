import { View, Text, Button, Image, ScrollView, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Input } from '../../components/input'
import { CheckCircle, IdCard, Mail } from 'lucide-react-native'

export default function medico_formulario() {

  const [ofensiva, setOfensiva] = useState(12)
  const [confirmData, setConfirmData] = useState(false);
  const [modal, setModal] = useState(false)

    // if (confirmData == true){
    //   setTimeout(() => {
    //     setConfirmData(false);
    //     setModal(false)
    //   }, 3000);
    // }
  
  return (
    <SafeAreaView className='bg-primary h-full w-full flex-1'>
        
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='items-center'>
        <Image source={require('../../assets/logoteeth.png')} className="w-52 h-10 items-center justify-center" />
        </View>
        <View className='items-center mt-4'>
          

          <View className='bg-white rounded-xl shadow-md px-4 py-3 flex-row items-center w-[90%] h-[15%]'>
            <Image source={require('../../assets/person-medic.png')} className='w-[21%] h-[90%] mr-3' />
            <View>
              <Text className='font-semibold text-lg'>EMANUELA PEREIRA DA SILVA</Text>
              <Text className='text-sm text-gray-500'>CPF = 123.***.***-74</Text>
              <Text className='text-sm text-gray-500'>22/09/1990</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-center space-x-4 px-6 mb-6 mt-6">
            <View className="mr-5">
              {ofensiva > 20 ? (
                <Image source={require('../../assets/Ouro_initial.jpg')} className="w-20 h-24" />
              ) : ofensiva > 10 ? (
                <Image source={require('../../assets/Prata_initial.jpg')} className="w-20 h-24" />
              ) : (
                <Image source={require('../../assets/Bronze_initial.jpg')} className="w-20 h-24" />
              )}
            </View>
            <View className="border-l-2 border-gray-300 pl-4">
              <Text className="text-white font-bold text-3xl">{ofensiva} dias</Text>
              <Text className="text-gray-200 text-lg">CONSECUTIVOS</Text>
            </View>
          </View>

          <Text className='text-white text-xl font-bold mb-4'>FORMULÁRIO</Text>
          <Input text="SIM/NÃO" imagem={<IdCard size={20} color="blue" />} keyboardType="default" returnKeyType="done"/>
          <Text className='text-white text-xl font-bold mb-4'>ESCOVAÇÃO</Text>
          <Input text='SIM/NÃO' imagem={<IdCard size={20} color="blue" />} keyboardType="default" returnKeyType="done"/>
          <Text className='text-white text-xl font-bold mb-4'>FIO DENTAL</Text>
          <Input text='SIM/NÃO' imagem={<IdCard size={20} color="blue" />} keyboardType="default" returnKeyType="done"/>
          <Text className='text-white text-xl font-bold mb-4'>BOCHECHO</Text>
          <Input text='SIM/NÃO' imagem={<IdCard size={20} color="blue" />} keyboardType="default" returnKeyType="done"/>

          <TouchableOpacity className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center mt-10 w-[170px]"> 
          <Text className="text-white text-lg font-bold">Enviar</Text>
          </TouchableOpacity>

          {/* {modal && (<Modal transparent animationType="fade">
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                            <Text className="text-blue-700 font-extrabold text-2xl text-center">ENVIO REALIZADO COM SUCESSO</Text>
                            <CheckCircle size={60} color="limegreen" className="mt-4" />
                        </View>
                    </View>
                </Modal>)} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
