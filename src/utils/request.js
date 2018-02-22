import { API } from '@/config/base'
import axios from 'axios'

const requester = {
    getCsrfCookie (cookieHandler) {
        return new Promise((resolve, reject) => {
            const csrfToken = cookieHandler.get('csrfToken')
            if (!csrfToken) {
                axios.request({
                    method: 'GET',
                    baseURL: API.prefix,
                    url: 'getCsrfToken'
                }).then(res => {
                    resolve(cookieHandler.get('csrfToken'))
                })
            } else {
                resolve(csrfToken)
            }
        })
    }
}

export default requester