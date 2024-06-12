import { useContext } from "react"
import { AuthContext } from "./FirebaseProvider"



const useAuth = () => {
    const data = useContext(AuthContext)
    return data
}

export default useAuth