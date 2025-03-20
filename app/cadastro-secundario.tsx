import { useState } from 'react';
import { Alert, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';

export default function CadastroSecundario() {
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [confirmData, setConfirmData] = useState(false);

    const validarCampos = () => {
        if (!endereco || !cep || !numero) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        } else if (!/^\d{8}$/.test(cep)) {
            Alert.alert("Erro", "CEP inválido! Deve conter 8 números.");
            return;
        } else if (!/^\d+$/.test(numero)) {
            Alert.alert("Erro", "O número deve conter apenas dígitos.");
            return;
        } else {
            setConfirmData(true);
            setTimeout(() => {
                setConfirmData(false);
                router.navigate('./initial');
            }, 3000);
        }
    };

    return (
        <View className="flex-1 items-center bg-[#003EA6] w-full h-full pt-12 px-5">
            <Image source={require('../assets/logoteeth.png')} className="w-40 mb-5" />
            <Text className="text-white text-2xl font-bold mb-5">INSERIR DADOS</Text>

            <Text className="text-white text-lg self-start mb-1">Endereço</Text>
            <TextInput className="bg-white w-full rounded-xl p-3 text-lg mb-4"
                placeholder="Digite seu endereço" placeholderTextColor="#888"
                value={endereco} onChangeText={setEndereco}
            />

            <View className="flex-row justify-between w-full">
                <View className="w-1/2 pr-2">
                    <Text className="text-white text-lg self-start mb-1">CEP</Text>
                    <TextInput className="bg-white w-full rounded-xl p-3 text-lg mb-4"
                        placeholder="Digite o CEP" placeholderTextColor="#888"
                        keyboardType="numeric" value={cep} onChangeText={setCep}
                        returnKeyType="done"
                    />
                </View>
                <View className="w-1/2 pl-2">
                    <Text className="text-white text-lg self-start mb-1">Número</Text>
                    <TextInput className="bg-white w-full rounded-xl p-3 text-lg mb-4"
                        placeholder="Número" placeholderTextColor="#888"
                        keyboardType="numeric" value={numero} onChangeText={setNumero}
                        returnKeyType="done"
                    />
                </View>
            </View>

            <Image source={require('../assets/sorriso.png')} className="w-[300px] h-[200px] rounded-xl my-5" />

            <TouchableOpacity className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center mt-10 w-[170px]"
                onPress={validarCampos}>
                <Text className="text-white text-lg font-bold">Enviar</Text>
            </TouchableOpacity>

            {confirmData && (
                <Modal transparent animationType="fade">
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="bg-white p-6 rounded-2xl w-4/5 items-center">
                            <Text className="text-blue-700 font-extrabold text-2xl text-center">
                                ENVIO REALIZADO COM SUCESSO
                            </Text>
                            <CheckCircle size={60} color="limegreen" className="mt-4" />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}
