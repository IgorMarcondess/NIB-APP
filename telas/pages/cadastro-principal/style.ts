import { StyleSheet } from "react-native";



export const style = StyleSheet.create({
    cadastro_principal:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#003EA6",
        width:"100%",
        height:"100%",
        paddingTop: 50
    },
    container:{
        flex: 1,
        alignItems: "center",
    },
    title:{
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
      marginBottom: 10
    },
    subtitle1: {
        color: "white",
        fontSize: 18
      },
      subtitle: {
        marginTop: 15,
        color: "white",
        fontSize: 18
      },
      button: {
        backgroundColor: "#003EA6",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
      container2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        gap: 20
      }
})
