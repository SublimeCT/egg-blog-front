// import axios from 'axios'
// import Cookie from 'js-cookie'
// import { API } from '@/config/base'

const hookHandler = {
    /**
     * 添加全局路由钩子
     * @param {* object} router vue-router 实例
     */
    global (router) {
        // 后台页面检测权限
        router.beforeEach((to, from, next) => {
            // console.group('%c[路由] %cbeforeEach 钩子', 'color:#9933CC', 'color:#000')
            // console.log('from =>', from.path)
            // console.log('to =>', to.path)
            next()
            // if (to.path.indexOf('/backend') === 0) {
            //     axios.request({
            //         method: 'POST',
            //         baseURL: API.prefix,
            //         url: '/checkLogin',
            //         headers: { 'X-CSRF-TOKEN': Cookie.get('csrfToken') }
            //     }).then(res => {
            //         console.warn(res)
            //         console.groupEnd()
            //         if (res.data.code === '0' && res.data.data && res.data.data.isLogin) {
            //             next()
            //             return
            //         } else {
            //             next({ path: '/' })
            //             return
            //         }
            //     }).catch(e => {
            //         next({ path: '/' })
            //         return
            //     })
            // } else {
            //     console.groupEnd()           
            //     next()
            //     return
            // }
        })
    }
}

export {
    hookHandler
}