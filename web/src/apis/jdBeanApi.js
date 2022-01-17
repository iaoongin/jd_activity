import http from "../utils/requests";

export function getJdBeanBalance() {
    return http.axios({
        url: '/api/jdBeanBalance/chart',
        method: 'get'
    })
}