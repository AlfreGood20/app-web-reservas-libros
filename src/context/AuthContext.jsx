import { createContext, useContext, useEffect, useState } from "react";
import { refresh } from "../api/authApi";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    
    const [accessToken, setAccessToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    const login = (token) => setAccessToken(token);
    const logout = () => setAccessToken(null);
    const refreshToken = (token) => setAccessToken(token);
    const isAuthenticated = accessToken !== null;

    useEffect(() => {

        refresh()
            .then(response => {
                if (!response.ok) throw new Error("No estas autenticado.");
                return response.json();
            })
            .then(data => setAccessToken(data.token_access))
            .catch(() => {logout()})
            .finally(() => setCargando(false));
    },[]);

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, refresh, isAuthenticated, cargando}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);