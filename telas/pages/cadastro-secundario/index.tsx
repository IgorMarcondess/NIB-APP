import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./style";


export default function Cadastro_secundario(){
    return(
    <View style={style.container}>
            <Image source={require('../../assets/logoteeth.png')} style={{width:160, marginBottom: 20}}/>
            <Text style={style.title}>INSERIR DADOS</Text>
            
            <Text style={style.label}>Endereço</Text>
            <TextInput style={style.input} placeholder="Digite seu endereço" placeholderTextColor="#888" />
            
            <View style={style.row}>
                <View style={style.inputContainer}>
                    <Text style={style.label}>CEP</Text>
                    <TextInput style={style.input} placeholder="Digite o CEP" placeholderTextColor="#888" keyboardType="numeric" />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>Número</Text>
                    <TextInput style={style.input} placeholder="Número" placeholderTextColor="#888" keyboardType="numeric" />
                </View>
            </View>
            
            <Image source={require('../../assets/sorriso.png')} style={style.image} />
            
            <TouchableOpacity style={style.button}>
                <Text style={style.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
)}