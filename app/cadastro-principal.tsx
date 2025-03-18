import { Mail } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../components/input'; // Assuming the Input component is the same
import { Link } from 'expo-router';

export default function CadastroPrincipal() {

    return (
        <View className="flex-1 items-center bg-[#003EA6] w-full h-full pt-12">
            <View className="flex-1 items-center">
                <Image
                    source={require('../../assets/logoteeth.png')}
                    className="w-40 mb-5"
                />
                <Text className="text-white text-2xl font-bold mb-2">INSERIR DADOS</Text>

                <Image
                    source={require('../../assets/image1.png')}
                    className="w-[300px] h-[200px] rounded-xl"
                />

                <Text className="text-white text-lg mt-4">CPF</Text>
                <Input
                    text="Digite seu E-mail!"
                    imagem={<Mail size={20} color="blue" />}
                    keyboardType="email-address"
                />

                <Text className="text-white text-lg mt-4">E-mail</Text>
                <Input
                    text="Digite seu E-mail!"
                    imagem={<Mail size={20} color="blue" />}
                    keyboardType="email-address"
                />

                <Text className="text-white text-lg mt-4">Confirmar E-mail</Text>
                <Input
                    text="Digite seu E-mail!"
                    imagem={<Mail size={20} color="blue" />}
                    keyboardType="email-address"
                />

                <Text className="text-white text-lg mt-4">Senha</Text>
                <Input
                    text="Digite sua Senha!"
                    imagem={<Mail size={20} color="blue" />}
                    keyboardType="email-address"
                />

                <View className="flex-row justify-center items-center gap-5 mt-10">
                    <Link href=''>
                    <TouchableOpacity
                        className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center">
                        <Text className="text-white text-lg font-bold">Voltar</Text>
                    </TouchableOpacity>
                    </Link>

                    <Link href=''>
                    <TouchableOpacity
                        className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center">
                        <Text className="text-white text-lg font-bold">Próximo</Text>
                    </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}
