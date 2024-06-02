import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth from "./Firebase.config"
import api from "../hooks/useAxios"

export const authProvider = createContext()

const FirebaseProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [userRole, setUserRole] = useState('')

    const google = new GoogleAuthProvider()
    const loginWithGoogle = () => {
        setUserLoading(true)
        return signInWithPopup(auth, google)
    }

    const createUser = (email, pass) => {
        setUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const UpdateProfile = (name, url) => {
        setUserLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        })
    }
    const logOut = () => {
        return signOut(auth)
    }
    const logging = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }


    useEffect(() => {
        setUserLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (data) => {
            if (data) {
                setUser(data);
                const userInfo = {
                    name: data.displayName,
                    email: data.email,
                    role: 'user'
                };
                try {
                    const userExistResponse = await api.post('/is_user_exist', { email: data.email });
                    if (userExistResponse.data.userExist) {
                        setUserRole(userExistResponse.data.result.role);
                    } else {
                        const newUserResponse = await api.post('/user', userInfo);
                        console.log('New user created:', newUserResponse.data);
                        setUserRole(userInfo.role);
                    }

                    const jwtResponse = await api.post('/jwt', { email: data.email });
                    localStorage.setItem('token', jwtResponse.data.token);
                } catch (error) {
                    console.error('Error during authentication state change handling:', error);
                } finally {
                    setUserLoading(false);
                }
            } else {
                localStorage.removeItem('token');
                setUserLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const allData = {
        createUser, logOut, user, setUser, loginWithGoogle, userLoading, setUserLoading, UpdateProfile, logging, userRole, setUserRole
    }
    return (
        <authProvider.Provider value={allData}>
            {children}
        </authProvider.Provider>
    )
}

export default FirebaseProvider