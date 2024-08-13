import React, {createContext, useEffect, useState} from "react";
import api from "../../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/auth/getCurrentUser');
                setUser(response.data);
            } catch (error) {
                console.error('User is not authenticated', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value = {{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;