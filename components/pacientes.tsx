import { router } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { usePaciente } from "./pacientesContext";

type PacientesProps = {
  imagem: ImageSourcePropType;
  nome: string;
  exame: string;
  hours: string;
};

export const Pacientes = ({ imagem, nome, exame, hours }: PacientesProps) => {
  const { setPacienteSelecionado, pacientesAtendidos } = usePaciente();

  const handlePress = () => {
    if (pacientesAtendidos.includes(nome)) {
      alert("Este paciente já foi atendido.");
      return;
    }
    setPacienteSelecionado({ nome, exame, horario: hours });
    router.push("/medico_formulario");
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-3xl flex-row items-center justify-start px-4 py-3 shadow-md space-x-4"
    >
      <Image source={imagem} className="w-16 h-16 rounded-full" />
      <View className="flex-1 items-center">
        <Text className="text-primary text-lg font-bold uppercase">{nome}</Text>
        <Text className="text-base text-black mt-0.5 font-medium">{`"${exame}"`}</Text>
        <View className="bg-primary w-40 h-11 rounded-xl justify-center items-center mt-3">
          <Text className="text-white text-xl font-semibold">{hours}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
