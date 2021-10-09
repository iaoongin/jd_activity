import http from "../utils/requests";

export function getJdUserInfo() {
    return http.axios({
        url: '/api/jdUserInfo',
        method: 'get'
    })
}


export function updateJdUserInfo(data) {
    return http.axios({
        url: '/api/jdUserInfo',
        method: 'post',
        data: data
    })
}
export function deleteJdUserInfo(data) {
    return http.axios({
        url: '/api/jdUserInfo',
        method: 'delete',
        data: data
    })
}