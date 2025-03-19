import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link} from 'expo-router';

export default function CadastroSecundario() {

  return (
    <View className="flex-1 items-center bg-[#003EA6] w-full h-full pt-12 px-5">
      <Image source={require('../assets/logoteeth.png')} className="w-40 mb-5"/>
      <Text className="text-white text-2xl font-bold mb-5">INSERIR DADOS</Text>

      <Text className="text-white text-lg self-start mb-1">Endereço</Text>
      <TextInput
        className="bg-white w-full rounded-xl p-3 text-lg mb-4"
        placeholder="Digite seu endereço"
        placeholderTextColor="#888"
      />

      <View className="flex-row justify-between w-full">
        <View className="w-1/2">
          <Text className="text-white text-lg self-start mb-1">CEP</Text>
          <TextInput
            className="bg-white w-full rounded-xl p-3 text-lg mb-4"
            placeholder="Digite o CEP"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>
        <View className="w-1/2">
          <Text className="text-white text-lg self-start mb-1">Número</Text>
          <TextInput
            className="bg-white w-full rounded-xl p-3 text-lg mb-4"
            placeholder="Número"
            placeholderTextColor="#888"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Image
        source={require('../assets/sorriso.png')}
        className="w-[300px] h-[200px] rounded-xl my-5"
      />
      <Link href="/" asChild>
      <TouchableOpacity className="bg-[#003EA6] py-3 px-8 rounded-full border-2 border-white items-center justify-center mt-10 w-[170px]">
        <Text className="text-white text-lg font-bold">Enviar</Text>
      </TouchableOpacity>
      </Link>
    </View>
  );
}
