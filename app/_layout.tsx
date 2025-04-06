import { Slot } from "expo-router"
import "../global.css"
import Tela from './(medico)/tela_principal'
import { UserProvider } from "../components/userContext";
 
const RootLayout = () => {
  return (
    <UserProvider>
    <Slot/>
    </UserProvider>
  )
}

export default RootLayout