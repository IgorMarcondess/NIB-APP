import { style } from "./style";
import { Text, View } from "react-native";



export default function Avaliacao(){
    return(
        <View style={style.container}>
            <View style={style.subcontainer}>
                <Text style={style.title}>O que foi realizado?</Text>
            </View>
        </View>
    )
}