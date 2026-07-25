import React, { useEffect, useState } from 'react'
import { getPerfil } from '../api/profileApi';
import { useAuth } from '../context/AuthContext';

export function usePerfil() {

    const {accessToken, isAuthenticated} = useAuth();
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        if (!isAuthenticated || !accessToken) {
            setPerfil(null);
            return;
        }

        setCargando(true);

        getPerfil(accessToken)
            .then(response => response.json())
            .then(data => setPerfil(data))
            .catch(error => console.log(error))
            .finally(() => setCargando(false));

    }, [accessToken, isAuthenticated])

    return { perfil, cargando };
}
