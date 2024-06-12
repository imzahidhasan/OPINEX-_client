import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "./Firebase.config";
import api from "../hooks/useAxios";

export const AuthContext = createContext();

const FirebaseProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState('');

    const googleProvider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        setUserLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const createUser = (email, pass) => {
        setUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    const updateProfileInfo = (name, url) => {
        setUserLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: url
        });
    };

    const logOut = () => {
        setUserLoading(true);
        return signOut(auth).finally(() => setUserLoading(false));
    };

    const logging = (email, pass) => {
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    role: 'user'
                };
                try {
                    const userExistResponse = await api.post('/is_user_exist', { email: currentUser.email });
                    if (userExistResponse.data.userExist) {
                        setUserRole(userExistResponse.data.result.role);
                    } else {
                        await api.post('/user', userInfo);
                        setUserRole(userInfo.role);
                    }

                    const jwtResponse = await api.post('/jwt', { email: currentUser.email });
                    localStorage.setItem('token', jwtResponse.data.token);
                } catch (error) {
                    console.error('Error during authentication state change handling:', error);
                } finally {
                    setUserLoading(false);
                }
            } else {
                setUser(null);
                localStorage.removeItem('token');
                setUserLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const allData = {
        createUser, logOut, user, setUser, loginWithGoogle, userLoading, setUserLoading, updateProfileInfo, logging, userRole, setUserRole
    };

    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;
