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
                console.log('User logged in:', currentUser);
                setUser(currentUser);
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    role: 'user'
                };
                try {
                    const userExistResponse = await api.post('/is_user_exist', { email: currentUser.email });
                    console.log('User existence response:', userExistResponse);

                    if (userExistResponse.data.userExist) {
                        setUserRole(userExistResponse.data.result.role);
                    } else {
                        const userCreationResponse = await api.post('/user', userInfo);
                        console.log('User creation response:', userCreationResponse);
                        setUserRole(userInfo.role);
                    }

                    const jwtResponse = await api.post('/jwt', { email: currentUser.email });
                    console.log('JWT response:', jwtResponse);

                    localStorage.setItem('token', jwtResponse.data.token);
                    console.log('Token stored in localStorage');
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
