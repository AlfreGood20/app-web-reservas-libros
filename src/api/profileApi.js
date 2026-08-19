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

export async function getPrestamos(tokenAccess, params) {
    
    const response = await fetch(
        `${API_URL}/prestamos/usuario?${params.toString()}`,{
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

export async function patchPerfil(tokenAccess, data) {
    
    const response = await fetch(
        `${API_URL}/perfil`,{
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${tokenAccess}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return response;
}