import axios from 'axios'
import Cookie from 'js-cookie'
import { API } from '@/config/base'

const hookHandler = {
    /**
     * 添加全局路由钩子
     * @param {* object} router vue-router 实例
     */
    global (router) {
        // 后台页面检测权限
        router.beforeEach((to, from, next) => {
            console.group('%c[路由] %cbeforeEach', 'color:#9933CC')
            if (to.path.indexOf('/backend') === 0) {
                // 首先检测 cookies 中是否有后台的 session
                if (!Cookie.get('EGG_SESS')) {
                    return location.href = '/'
                }
                axios.request({
                    method: 'POST',
                    baseURL: API.prefix,
                    url: '/api/checkLogin',
                    headers: { 'X-CSRF-TOKEN': Cookie.get('csrfToken') }
                }).then(res => {
                    console.warn(res)
                    // if (res.code === '0' && res.data && res.data.isLogin) {
                    //     next()
                    // } else {
                    //     location.href = '/'
                    // }
                })
            } else {
                next()
            }
        })
    }
}

export {
    hookHandler
}