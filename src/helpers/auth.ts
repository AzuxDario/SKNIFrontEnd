import axios from 'axios';


const accessTokenName: string = 'access_token';
const refreshTokenName: string = 'refresh_token';

export async function login(username: string, password: string) {
    const response = await axios.post('http://localhost:8000/obtain-token/', { 'username': username, 'password': password, }); // tslint:disable-line
    if (response.status === 200) {
        localStorage.setItem(accessTokenName, response.data.access);
        localStorage.setItem(refreshTokenName, response.data.refresh);
    }

    return response;
}

export function logout() {
    localStorage.removeItem(accessTokenName);
    localStorage.removeItem(refreshTokenName);
}

export async function refreshToken() {
    const token = localStorage.getItem(refreshTokenName);

    let response = await axios.post('http://localhost:8000/refresh-token/', { 'refresh': token }); // tslint:disable-line
    if (response.status === 200) {
        localStorage.setItem(accessTokenName, response.data.access);
    }

    return response;
}

export async function isLoggedIn(): Promise<boolean> {
    const token = localStorage.getItem(accessTokenName);
    if (token === null) {
        return false;
    }

    const res = await axios.post('http://localhost:8000/verify-token/', {'token': token}); // tslint:disable-line
    if (res.status === 200) {
        return true;
    }

    const refresh = await refreshToken();
    if (refresh.status === 200) {
        return true;
    }

    return false;
}

export function tokenExists(): boolean {
    const token = localStorage.getItem(accessTokenName);
    return token !== null;
}

export function createAuthHeader() {
    const token = localStorage.getItem(accessTokenName);

    if (token == null) {
        return;
    }

    return {
        'Authorization': 'Bearer ' + token, // tslint:disable-line
    };
}

export async function registerUser(userData: any) {
    const response = await axios.post('http://localhost:8000/users/', userData);

    return response;
}
