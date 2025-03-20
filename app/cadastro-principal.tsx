import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Mail } from 'lucide-react-native';
import { Input } from '../components/input';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CadastroPrincipal() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const validarCampos = () => {
        if (!cpf || !email || !confirmEmail || !senha || !telefone) {
            Alert.alert("Erro", "Preencha todos os campos.");
        } else if (!/^\d{11}$/.test(cpf)) {
            Alert.alert("Erro", "CPF inválido! Deve conter 11 números.");
        } else if (!/^\d{11}$/.test(telefone)) {
            Alert.alert("Erro", "Número de telefone inválido! Deve conter 11 números.");
        } else if (email !== confirmEmail) {
            Alert.alert("Erro", "Os e-mails não coincidem.");
        } else {
            router.navigate("/cadastro-secundario");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#003EA6] w-full h-full">
            <ScrollView>
                <View className="flex-1 items-center">
                    <Image source={require('../assets/logoteeth.png')} className="w-40 mb-5" />
                    <Text className="text-white text-2xl font-bold mb-2">INSERIR DADOS</Text>

                    <Image source={require('../assets/image1.png')} className="w-[300px] h-[200px] rounded-xl" />

                    <Text className="text-white text-lg mt-4">CPF</Text>
                    <Input text="Digite seu CPF!" imagem={<Mail size={20} color="blue" />} 
                        keyboardType="numeric" value={cpf} onChangeText={setCpf}
                        returnKeyType="done"
                    />

                    <Text className="text-white text-lg mt-4">E-mail</Text>
                    <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} 
                        keyboardType="email-address" value={email} onChangeText={setEmail} 
                    />

                    <Text className="text-white text-lg mt-4">Confirmar E-mail</Text>
                    <Input text="Digite seu E-mail novamente!" imagem={<Mail size={20} color="blue" />} 
                        keyboardType="email-address" value={confirmEmail} onChangeText={setConfirmEmail} 
                    />

                    <Text className="text-white text-lg mt-4">Senha</Text>
                    <Input text="Digite sua Senha!" imagem={<Mail size={20} color="blue" />} 
                        keyboardType="default" secureTextEntry value={senha} onChangeText={setSenha} 
                    />

                    <Text className="text-white text-lg mt-4">Telefone</Text>
                    <Input text="Digite seu Telefone!" imagem={<Mail size={20} color="blue" />} 
                        keyboardType="numeric" value={telefone} onChangeText={setTelefone} 
                        returnKeyType="done"
                    />

                    <View className="flex-row justify-center items-center gap-5 mt-10">
                            <TouchableOpacity className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center" onPress={() => router.back()}>
                                <Text className="text-white text-lg font-bold">Voltar</Text>
                            </TouchableOpacity>

                        <TouchableOpacity onPress={validarCampos} 
                            className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center"
                        >
                            <Text className="text-white text-lg font-bold">Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
