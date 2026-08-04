import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { getReservas, patchReserva } from '../api/reservationApi';

export function useReservation(estado) {

    const {accessToken} = useAuth();
    const [reservas, setReservas] = useState(null);
    const [cargando, setCargando] = useState(false);


    useEffect(() => {

        if(accessToken === null){
            return;
        }

        setCargando(true);

        getReservas(accessToken, estado)
            .then(response => response.json())
            .then(datas => setReservas(datas))
            .catch(() => toast.error('Ocurrio un error con el servidor.'))
            .finally(() => setCargando(false));

    }, [accessToken, estado])


    const cancelarReserva = async (reservaId) => {

        setCargando(true);

        const response = await patchReserva(accessToken, reservaId);
        const body = await response.json();

        if(!response.ok){
            throw new Error(body.menssaje);
        }

        setReservas(prev => prev.map(r => r.id === reservaId ? body : r));

        setCargando(false);
    }

    return { cargando, reservas, cancelarReserva}
}
