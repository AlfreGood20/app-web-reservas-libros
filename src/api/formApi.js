import { API_URL } from "./api";

export async function getMunicipios() {

    const response = await fetch(`${API_URL}/municipios`);

    if (!response.ok) {
        throw new Error(response);
    }

    return await response.json();
}

export async function postRegister(data) {

    const response = await fetch(
        `${API_URL}/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return response;
}