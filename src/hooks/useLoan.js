import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { getPrestamos } from '../api/profileApi';
import { toast } from 'react-toastify';

export default function useLoan() {
  
    const [cargando, setCargando] = useState(false);
    const [prestamos, setPrestamos] = useState(null);

    const {accessToken} = useAuth();

    useEffect(() => {

        if(accessToken === null){
            return;
        }

        setCargando(true);

        getPrestamos(accessToken)
            .then(response => response.json())
            .then(datas => setPrestamos(datas))
            .catch(() => toast.error('Ocurrio un error con el servidor.'))
            .finally(() => setCargando(false));

    }, [accessToken]);

    return {cargando, prestamos}
}
