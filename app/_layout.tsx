import { Slot } from "expo-router"
import "../global.css"
import { UserProvider } from "../components/userContext";
import  Initial  from "./initial"

 
const RootLayout = () => {
  return (
    <UserProvider>
        <Initial />
    </UserProvider>
  )
}

export default RootLayout