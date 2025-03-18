import { StyleSheet } from "react-native";



export const style = StyleSheet.create({
    conta:{
        flex: 1,
        width: "auto",
        height: "100%",
        backgroundColor: "white",
        alignItems: "center",
    },
    subcontainer:{
        flex:1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 60
    },
    case: {
    flexDirection: "row",
      width: 350,
      alignItems: "center",
      justifyContent:"center",
      borderWidth: 1,
      borderColor: "blue",
      borderRadius: 20,
      height: 60,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      marginBottom: 15
    },
    title:{
        marginTop: 15,
        marginBottom:5,
        color: "#003EA6",
        fontSize:15
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