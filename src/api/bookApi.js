import { API_URL } from "./api";

export async function getLibros(params) {

    const response = await fetch(`${API_URL}/libros/public?${params.toString()}`);

    if (!response.ok) {
        throw new Error(response);
    }

    return response;
}

export async function getLibroPorId(id) {
    const response = await fetch(`${API_URL}/libros/public/${id}`);

    if (!response.ok) {
        throw new Error(response);
    }

    return response;
}