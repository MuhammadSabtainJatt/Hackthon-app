import React, { useState, createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const initialState = { isAuth: false, isSuperAdmin: false, user: {} };

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuth: true, isSuperAdmin: payload.isSuperAdmin, user: payload.user };
        case "SET_LOGGED_OUT":
            return initialState;
        default:
            return state;
    }
};

export default function AuthContextProvider({ children }) {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ isAppLoading, ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
