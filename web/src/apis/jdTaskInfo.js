import http from "../utils/requests";

export function getJdTaskInfo() {
    return http.axios({
        url: '/api/jdTaskInfo',
        method: 'get'
    })
}
export function exec(data) {
    return http.axios({
        url: '/api/jdTaskInfo/exec',
        data: data,
        method: 'post'
    })
}