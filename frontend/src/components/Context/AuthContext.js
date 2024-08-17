import React, { createContext, useEffect, useReducer } from "react";
import api from "../../api/api";

const AuthContext = createContext();

const initialState = {
    user: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log('LOGIN action dispatched:', action.payload);
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            console.log('LOGOUT action dispatched');
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        console.log('AuthProvider mounted');
        if (localStorage.getItem("token") != null) {
            const fetchUser = async () => {
                try {
                    const response = await api.get('/auth/getCurrentUser');
                    console.log('User fetched:', response.data);
                    dispatch({ type: 'LOGIN', payload: response.data });
                } catch (error) {
                    console.log('Error fetching user:', error);
                    localStorage.removeItem('token');
                }
            };
            fetchUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
