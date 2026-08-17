import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFine } from '../api/fineApi';
import { toast } from 'react-toastify';

export function useFine({ page= 0, size= 10, sort= 'diasRetraso,asc', estado = undefined} = {} ) {

    const { accessToken } = useAuth();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        if(accessToken === null){
            return;
        }

        setCargando(true);

        const filtros = {
            page,size,sort,estado
        }

        const params = new URLSearchParams(
            Object.fromEntries(
                Object.entries(filtros).filter(([_, valor]) => valor !== undefined && valor !== '')
        ));

        getFine(accessToken, params)
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(() => toast.error("OCURRIO UN ERROR EN EL SERVIDOR."))
            .finally(() => setCargando(false));

    },[page, size, sort, estado, accessToken]);

    return { datos, cargando };
}
