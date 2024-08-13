import React, {createContext, useEffect, useState} from "react";
import api from "../../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            const fetchUser = async () => {
                try {
                    const response = await api.get('/auth/getCurrentUser');
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                    console.log(localStorage.getItem('token'));
                    console.error('User is not authenticated', error);
                }
            };
            fetchUser();
        }
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <AuthContext.Provider value = {{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;