import http from "../utils/requests";

export function getJdTaskInfo() {
    return http.axios({
        url: '/api/jdTaskInfo',
        method: 'get'
    })
}