import { Slot } from "expo-router";
import Tela from "../app/enviarImagem"
import { UserProvider } from "../components/userContext";
import "../global.css";


const RootLayout = () => {
  return (
  <UserProvider >
    <Slot />
  </UserProvider>
  )
}

export default RootLayout