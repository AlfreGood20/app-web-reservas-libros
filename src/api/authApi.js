import { API_URL } from "./api";


export async function register(data) {

    const respose = await fetch(
        `${API_URL}/auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    );

    return respose;
}

export async function postLogin(data) {

    const response = await fetch(
        `${API_URL}/auth/login`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    );

    return response;
}

export async function postLogout(tokenAccess) {

    const response = await fetch(
        `${API_URL}/auth/logout`,{
            method: "POST",
            credentials: "include",
            headers: {
                'Authorization':`Bearer ${tokenAccess}`
            }
        }
    );

    return response;
}

export async function refresh(){

    const response = await fetch(
        `${API_URL}/auth/refresh`,{
            method: "POST",
            credentials: "include"
        }
    );

    return response;
}