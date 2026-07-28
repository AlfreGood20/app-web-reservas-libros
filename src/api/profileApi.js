import React from 'react'
import { API_URL } from './api';

export async function getPerfil(tokenAccess) {

    const response = await fetch(
        `${API_URL}/usuarios/perfil`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

export async function getReservas(tokenAccess) {

    const response = await fetch(
        `${API_URL}/reservas/usuario`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

export async function postUpdateImagenPerfil(tokenAccess, data) {
    
    const response = await fetch(
        `${API_URL}/usuarios/perfil/foto`,{
            method: "POST",
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            },
            body: data
        }
    );

    return response;
}