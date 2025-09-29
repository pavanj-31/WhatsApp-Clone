import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../../firebase.config"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const docRef = doc(firestore, "users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { email, name, status } = docSnap.data();
                    setUserData({
                        id: currentUser?.uid,
                        email,
                        name,
                        status: status ? status : ""
                    });
                    updateLastSeen(currentUser);
                } else {  //clear context on logout
                    setUserData(null);
                }
            }
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    }, [])
    const updateLastSeen = async (user) => {
        await updateDoc(doc(firestore, "users", user.uid), {
            lastSeen: serverTimestamp(),
        });
    };

    const updateName = async (name) => {
        await updateDoc(doc(firestore, "users", userData.id), {
            name: name,
        });
        setUserData({
            ...userData,
            name: name,
        });
    };

    const updateStatus = async (status) => {
        await updateDoc(doc(firestore, "users", userData.id), {
            status: status,
        });
        setUserData({
            ...userData,
            status: status,
        });
    };

    const logout = async () => {
        await signOut(auth);
        setUserData(null);
    };

    return <AuthContext.Provider value={{
        setUserData, userData, loading, logout,
        updateName,
        updateStatus,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;