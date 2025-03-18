import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#003EA6",
        width: "100%",
        height: "100%",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    logo: {
        width: 160,
        height: 40,
        marginBottom: 20,
    },
    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        color: "white",
        fontSize: 18,
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    inputContainer: {
        width: "48%",
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginVertical: 20,
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
        marginTop: 40,
        width: 170
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    }
})