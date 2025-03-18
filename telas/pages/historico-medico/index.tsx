import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { Input } from "../../components/input/input";
import { CalendarPlus2, Mail } from "lucide-react-native";


export default function Historico_medico(){
    return(
        <View style={style.cadastro_principal}>
            <View style={style.container}>
                <Text style={style.title}>Histórico Médico</Text>
                <Text style={style.subtitle}>Já realizou tratamento?</Text>
                <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue"/>} keyboardType="default"/>
                <Text style={style.subtitle}>Já realizou canal?</Text>
                <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default"/>
                <Text style={style.subtitle}>Já realizou limpeza?</Text>
                <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default"/>
                <Text style={style.subtitle}>Já realizou colocação de aparelho ortodôntico?</Text>
                <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default"/>
                <Text style={style.subtitle}>Já realizou alguma cirurgia?</Text>
                <Input text="SIM OU NÃO" imagem={<CalendarPlus2 size={20} color="blue" />} keyboardType="default"/>
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}   