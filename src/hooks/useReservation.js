import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { getReservas, patchReserva, postReserva } from '../api/reservationApi';

export function useReservation({ page = 0, estado = undefined, fetchReservas = true } = {}) {

    const {accessToken} = useAuth();
    const [datos, setDatos] = useState(null);
    const [cargando, setCargando] = useState(false);


    useEffect(() => {

        if (!fetchReservas || accessToken === null) {
            return;
        }

        setCargando(true);

        const filtros = {
            estado,
            page
        }

        const params = new URLSearchParams(
            Object.fromEntries(
                Object.entries(filtros).filter(([_, valor]) => valor !== undefined && valor !== '')
        ));

        getReservas(accessToken, params)
            .then(response => response.json())
            .then(datas => setDatos(datas))
            .catch(() => toast.error('OCURRIÓ UN ERROR EN EL SERVIDOR.'))
            .finally(() => setCargando(false));

    }, [accessToken, page, estado]);


    const cancelarReserva = async (reservaId) => {

        setCargando(true);

        const response = await patchReserva(accessToken, reservaId);
        const body = await response.json();

        if(!response.ok){
            throw new Error(body.menssaje);
        }

        setDatos(prev => ({
            ...prev,
            contenido: prev.contenido.map(r =>
                r.id === reservaId ? body : r
            )
        }));

        setCargando(false);
    }

    const pedirNuevaReserva = async (data) => {
        setCargando(true);

        const response = await postReserva(accessToken, data);
        const body = await response.json();

        if(!response.ok){
            setCargando(false);
            throw new Error(body.menssaje);
        }
        setCargando(false);
    }

    return { cargando, datos, cancelarReserva, pedirNuevaReserva}
}
