import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getReservas } from '../api/profileApi';
import { toast } from 'react-toastify';

export function useReservation() {

    const {accessToken} = useAuth();
    const [reservas, setReservas] = useState(null);
    const [cargando, setCargando] = useState(false);


    useEffect(() => {

        if(accessToken === null){
            return;
        }

        setCargando(true);

        getReservas(accessToken)
            .then(response => response.json())
            .then(datas => setReservas(datas))
            .catch(() => toast.error('Ocurrio un error con el servidor.'))
            .finally(() => setCargando(false));

    }, [accessToken])

    return { cargando, reservas }
}
