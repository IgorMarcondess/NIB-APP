import { Image, Text, View, TouchableOpacity, Button } from "react-native"
import {style} from "./style"
import { Input } from "../../components/input/input";
import { Mail } from "lucide-react-native";

export default function Conta(){
    return(
        <View style={style.conta}>
            <View style={style.subcontainer}>
                <Image source={require('../../assets/ManImage2.png')} style={{width:270, height: 265, marginBottom: 20}}/>
                <Text style={style.title}>E-mail</Text>
                <View style={style.case}>
                    <Text></Text>
                </View>
                <Text style={style.title}>Senha</Text>
                <View style={style.case}>
                    <Text>{}</Text>
                </View>
                <Text style={style.title}>Telefone</Text>
                <View style={style.case}>
                    <Text>{}</Text>
                </View>
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}