import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      width:"95%",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "blue",
      borderRadius: 20,
      height: 50,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      marginBottom: 15
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    input: {
      flex: 1
    },
  });
  