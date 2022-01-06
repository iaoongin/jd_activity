export const TOKEN_PREFIX = "Bearer ";
export const HttpHeaderAuthorization = "Authorization";
export const TOKEN_KEY = "token";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
    return localStorage.removeItem(TOKEN_KEY)
}