import { Link } from 'expo-router';
import { CalendarPlus2 } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../components/input'; // Assuming Input is the same as before

export default function HistoricoMedico() {

    return (
        <View className="flex-1 items-center bg-white w-full h-full pt-12">
            <View className="mt-5 flex-1 items-center">
                <Text className="text-[#003EA6] text-3xl font-bold mb-8">Histórico Médico</Text>

                <Text className="text-[#003EA6] text-lg mt-6 mb-2">Já realizou tratamento?</Text>
                <Input
                    text="SIM OU NÃO"
                    imagem={<CalendarPlus2 size={20} color="blue" />}
                    keyboardType="default"
                />

                <Text className="text-[#003EA6] text-lg mt-6 mb-2">Já realizou canal?</Text>
                <Input
                    text="SIM OU NÃO"
                    imagem={<CalendarPlus2 size={20} color="blue" />}
                    keyboardType="default"
                />

                <Text className="text-[#003EA6] text-lg mt-6 mb-2">Já realizou limpeza?</Text>
                <Input
                    text="SIM OU NÃO"
                    imagem={<CalendarPlus2 size={20} color="blue" />}
                    keyboardType="default"
                />

                <Text className="text-[#003EA6] text-lg mt-6 mb-2">Já realizou colocação de aparelho ortodôntico?</Text>
                <Input
                    text="SIM OU NÃO"
                    imagem={<CalendarPlus2 size={20} color="blue" />}
                    keyboardType="default"
                />

                <Text className="text-[#003EA6] text-lg mt-6 mb-2">Já realizou alguma cirurgia?</Text>
                <Input
                    text="SIM OU NÃO"
                    imagem={<CalendarPlus2 size={20} color="blue" />}
                    keyboardType="default"
                />

                <Link href='' asChild>
                    <TouchableOpacity
                        className="bg-[#003EA6] py-3 px-8 rounded-full items-center justify-center mt-6">
                        <Text className="text-white text-lg font-bold">Enviar</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}
