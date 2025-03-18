import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    title:{
        marginTop: 15,
        marginBottom:30,
        color: "#003EA6",
        fontSize:30,
        fontWeight: "bold"
    },
    cadastro_principal:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        width:"100%",
        height:"100%",
        paddingTop: 50
    },
    container:{
        marginTop: 20,
        flex:1,
        alignItems: "center",
    },
    subtitle: {
        marginTop: 15,
        color: "#003EA6",
        fontSize: 15,
        marginBottom: 5
    },
    button: {
        backgroundColor: "#003EA6",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30, 
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
})