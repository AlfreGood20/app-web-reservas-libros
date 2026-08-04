import { API_URL } from "./api";


export async function getReservas(tokenAccess, estado) {

    const response = await fetch(
        `${API_URL}/reservas/usuario?estado=${estado}`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}


export async function patchReserva(tokenAccess, reservaId) {

    const response = await fetch(
        `${API_URL}/reservas/usuario/${reservaId}`,{
            method: 'PATCH',
            headers: {
                'Authorization':`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}
