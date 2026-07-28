import React, { useEffect, useState } from 'react'
import { getPerfil, postUpdateImagenPerfil } from '../api/profileApi';
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

export function usePerfilUpdateImagen() {
    const { accessToken } = useAuth();
    const [cargando, setCargando] = useState(false);

    const subirImagen = async (archivo) => {
        setCargando(true);

        const formData = new FormData();
        formData.append("imagen", archivo);

        const respuesta = await postUpdateImagenPerfil(accessToken, formData);
        const body = await respuesta.json();

        if(!respuesta.ok){
            throw new Error(body.menssaje);
        }

        setCargando(false);

        return respuesta;
    };

    return { subirImagen, cargando };
}