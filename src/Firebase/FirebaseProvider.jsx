import { createUserWithEmailAndPassword } from "firebase/auth"
import { createContext } from "react"
import auth from "./Firebase.config"

export const authProvider = createContext()
const FirebaseProvider = ({ children }) => {

    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }
    const logOut = () => {
        return 
    }

    const allData = {
        createUser,
    }
    return (
        <authProvider.Provider value={allData}>
            {children}
        </authProvider.Provider>
    )
}

export default FirebaseProvider