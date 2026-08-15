import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { postLogout } from '../api/authApi';

export function useLogout() {

    const [cargando, setCargando] = useState(false);
    const { logout,  accessToken } = useAuth();

    const salirSession = async () => {
        const response = await postLogout(accessToken);
        if(response.status === 204){
            logout();
            return;
        }
    }

    return { cargando, salirSession};
}