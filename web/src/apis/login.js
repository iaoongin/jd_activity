import http from "../utils/requests";

export function login(data) {
    return http.axios({
        url: '/api/auth/login',
        method: 'post',
        header:{
            "Content-Type": "multipart/form-data;"
        },
        data: data
    })
}
export function logout() {
    return http.axios({
        url: '/api/auth/logout',
        method: 'delete'
    })
}

export function getInfo() {
    return http.axios({
        // url: '/api/auth/getInfo',
        url: '/api/auth/info',
        method: 'get'
    })
}