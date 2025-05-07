import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/input';
import { registerUser } from '../services/firebase'; // ✅ Importa sua função

export default function CadastroPrincipal() {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');

    const validarCampos_EnviarInformacao = async () => {
        if (!cpf || !email || !nome || !senha || !telefone) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }

        if (!/^\d{11}$/.test(cpf)) {
            Alert.alert("Erro", "CPF inválido! Deve conter 11 números.");
            return;
        }

        if (!/^\d{11}$/.test(telefone)) {
            Alert.alert("Erro", "Número de telefone inválido! Deve conter 11 números.");
            return;
        }

        try {
            const usuario = {
                email,
                senha, // texto puro, conforme solicitado
                nome: `${nome} ${sobrenome}`,
                sobrenome,
                telefone,
                plano: "Premium",
                cpf,
            };

            const response = await registerUser(usuario);
            console.log("Usuário registrado:", response);

            Alert.alert("Sucesso!", "Usuário cadastrado com sucesso.");
            router.navigate("./cadastro-secundario");

        } catch (error: any) {
            Alert.alert("Erro!", error.message || "Erro ao registrar o usuário.");
            console.error("Erro ao registrar:", error);
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
                    <Input text="Digite seu CPF!" imagem={<Feather name="mail" size={20} color="blue" />} keyboardType="numeric" value={cpf} onChangeText={setCpf} returnKeyType="done" />

                    <Text className="text-white text-lg mt-4">Nome</Text>
                    <Input text="Digite seu nome" imagem={<Feather name="user" size={20} color="blue" />} value={nome} onChangeText={setNome} />

                    <Text className="text-white text-lg mt-4">Sobrenome</Text>
                    <Input text="Digite seu sobrenome" imagem={<Feather name="user" size={20} color="blue" />} value={sobrenome} onChangeText={setSobrenome} />

                    <Text className="text-white text-lg mt-4">E-mail</Text>
                    <Input text="Digite seu E-mail!" imagem={<Feather name="mail" size={20} color="blue" />} keyboardType="email-address" value={email} onChangeText={setEmail} />

                    <Text className="text-white text-lg mt-4">Senha</Text>
                    <Input text="Digite sua Senha!" imagem={<Feather name="lock" size={20} color="blue" />} secureTextEntry value={senha} onChangeText={setSenha} />

                    <Text className="text-white text-lg mt-4">Telefone</Text>
                    <Input text="Digite seu Telefone!" imagem={<Feather name="phone" size={20} color="blue" />} keyboardType="numeric" value={telefone} onChangeText={setTelefone} returnKeyType="done" />

                    <View className="flex-row justify-center items-center gap-5 mt-10">
                        <TouchableOpacity className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white" onPress={() => router.back()}>
                            <Text className="text-white text-lg font-bold">Voltar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={validarCampos_EnviarInformacao} className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white">
                            <Text className="text-white text-lg font-bold">Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
