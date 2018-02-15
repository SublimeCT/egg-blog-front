import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Articles from '@/views/article/Articles'
import Article from '@/views/article/Article'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '主页',
            component: Index,
            redirect: '/articles',
            children: [
                {
                    path: '/articles',
                    name: '博客主页',
                    component: Articles
                },
                {
                    path: '/article/:id',
                    name: '文章页',
                    component: Article
                },
                {
                    path: 'login',
                    name: '登录页',
                    component: Login
                }
            ]
        }
    ]
})
