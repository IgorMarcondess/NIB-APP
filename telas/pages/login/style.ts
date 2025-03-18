import { Dimensions, StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "white"
    },
    boxTop:{
        flex:1,
        backgroundColor: "#003EA6",
        borderBottomRightRadius: 270,
        borderBottomStartRadius: 270,
        width: "100%",
        height:500, 
    },
    boxTop2:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    },
    imagem:{
        width:250,
        height:250
    },
    label: {
        textAlign: "center",
        marginBottom: 5,
        color: "#000",
        fontSize: 14,
      },
    input: {
        borderWidth: 1,
        borderColor: "blue",
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    boxBottom:{
        flex:1,
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
    },
    title:{
        fontFamily: "",
        fontSize: 40,
        marginLeft: 20,
        marginTop: 50,
        color: "white"
    },
    subtitle:{
        fontSize: 25,
        marginLeft: 20,
        color: "white"
    },
    buttonSmall: {
        backgroundColor: "#003EA6",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "50%",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 25
      },
      buttonLarge: {
        backgroundColor: "#003EA6",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      subtitle1: {
        color: "#003EA6",
        marginTop: 10
      },
      subtitle2: {
        color: "#003EA6"
      }

})