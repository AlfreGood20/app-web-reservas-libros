import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { getPrestamos } from '../api/profileApi';
import { toast } from 'react-toastify';

export default function useLoan({ page=0, size=10, sort='fechaLimite,desc', estado=undefined } = {}) {
  
    const [cargando, setCargando] = useState(false);
    const [datos, setDatos] = useState(null);

    const {accessToken} = useAuth();

    useEffect(() => {

        if(accessToken === null){
            return;
        }

        const filtros = {
            page, size, sort, estado
        }

        const params = new URLSearchParams(
            Object.fromEntries(
                Object.entries(filtros).filter(([_, valor]) => valor !== undefined && valor !== '')
        ));

        setCargando(true);

        getPrestamos(accessToken, params)
            .then(response => response.json())
            .then(datas => setDatos(datas))
            .catch(() => toast.error('OCURRIÓ UN ERROR EN EL SERVIDOR.'))
            .finally(() => setCargando(false));

    }, [accessToken, page, size, sort, estado]);

    return {cargando, datos}
}
