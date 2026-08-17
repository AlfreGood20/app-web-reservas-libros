import React from 'react'
import { API_URL } from './api'

export async function getFine(tokenAccess, params) {

    const response = await fetch(
        `${API_URL}/multas/usuario?${params.toString()}`,{
            headers: {
                'Authorization':`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}
