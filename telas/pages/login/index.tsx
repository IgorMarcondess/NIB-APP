import { Image, Text, View, TouchableOpacity, Button } from "react-native"
import {style} from "./style"
import { Input } from "../../components/input/input"
import { Eye, Mail } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"


export default function Login(){
    return(
        <View style={style.container}>   
            <View style={style.boxTop}>
                <Image source={require('../../assets/logoteeth.png')} style={{width:160, marginLeft: "30%", marginTop: "-10%"}}/>
                <Text style={style.title}>Bem - vindo</Text>
                <Text style={style.subtitle}>Log In</Text>
                <View style={style.boxTop2}>
                    <Image source={require('../../assets/manImage.png')} style={style.imagem}/>
                </View>
            </View>
            <View style={style.boxBottom}>
                <Text style={style.subtitle1}>E-mail</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address"/>
                <Text style={style.subtitle2}>Senha</Text>
                <Input text="Senha" imagem={<Eye size={20} color="blue" />} keyboardType="email-address"/>

                <TouchableOpacity style={style.buttonSmall}>
                    <Text style={style.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.buttonLarge}>
                    <Text style={style .buttonText}>REGISTRE-SE AQUI</Text>
                </TouchableOpacity>
                <StatusBar style="auto"/>
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}