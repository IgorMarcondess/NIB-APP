import { Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { Input } from "../../components/input/input";
import { Mail } from "lucide-react-native";


export default function Cadastro_principal(){
    return(
        <View style={style.cadastro_principal}>
            <View style={style.container}>
                <Image source={require('../../assets/logoteeth.png')} style={{width:160, marginBottom: 20}}/>
                <Text style={style.title}>INSERIR DADOS</Text>
                <Image source={require('../../assets/image1.png')} style={{width:300, height: 200, borderRadius: 10}}/>
                <Text style={style.subtitle}>CPF</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address"/>
                <Text style={style.subtitle1}>E-mail</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address"/>
                <Text style={style.subtitle1}>Confirmar E-mail</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address"/>
                <Text style={style.subtitle1}>Senha</Text>
                <Input text="Digite seu E-mail!" imagem={<Mail size={20} color="blue" />} keyboardType="email-address"/>
                <View style={style.container2}>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button}>
                        <Text style={style.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}