import { useContext } from "react"
import { authProvider } from "./FirebaseProvider"


const useAuth = () => {
    const data = useContext(authProvider)
    return data
}

export default useAuth