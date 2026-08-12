import { API_URL } from "./api";

/* OBTIENES TODAS LAS RESERVAS */
export async function getReservas(tokenAccess, params) {

    const response = await fetch(
        `${API_URL}/reservas/usuario?${params.toString()}`,{
            headers: {
                "Authorization":`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

/* CANCELAS UNA RESERVA A CANCELADO */
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

/* CREAS UNA NUEVA RESERVA */
export async function postReserva(tokenAccess, data) {

    const response = await fetch(
        `${API_URL}/reservas/usuario`,{
            method: "POST",
            headers: {
                'Authorization': `Bearer ${tokenAccess}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    return response;
}