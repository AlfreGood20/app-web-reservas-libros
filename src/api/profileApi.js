import React from 'react'
import { API_URL } from './api';

export async function getPerfil(tokenAccess) {

    const response = await fetch(
        `${API_URL}/perfil`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

export async function getPrestamos(tokenAccess) {
    
    const response = await fetch(
        `${API_URL}/prestamos/usuario`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

export async function postUpdateImagenPerfil(tokenAccess, data) {
    
    const response = await fetch(
        `${API_URL}/perfil/foto`,{
            method: "PATCH",
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            },
            body: data
        }
    );

    return response;
}