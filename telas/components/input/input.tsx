import React, { forwardRef, LegacyRef } from "react";
import { Image, StyleProp, TextInput, TextInputProps, TextStyle, View } from "react-native";
import { style } from "./style";



type InputProps = TextInputProps & {
    imagem?: JSX.Element; 
    text?: string;
    styles?: StyleProp<TextStyle>;
}

export const Input = (Props: InputProps) => {
    const { imagem, text, styles, ...rest } = Props;
    return(
        
        <View style={style.inputContainer}>
            {Props.imagem && <View style={style.icon}>{Props.imagem}</View>}
            <TextInput style={[style.input, Props.styles]} placeholder={Props.text} {...rest}/>
            
        </View>
    )
}