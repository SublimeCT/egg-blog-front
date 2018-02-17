import Vue from 'vue'
import Router from 'vue-router'
// 全局路由钩子
import { hookHandler } from './hooks'

// page-front
import Index from '@/views/Index'
import Articles from '@/views/article/Articles'
import Article from '@/views/article/Article'
import Login from '@/views/Login'
// page-backend
import BackendIndex from '@/views/backend/Index'
import PublishArticles from '@/views/backend/Articles'
import ModifyArticle from '@/views/backend/ModifyArticle'
import Settings from '@/views/backend/Settings'

Vue.use(Router)

const routerInfo = new Router({
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
                    path: '/login',
                    name: '登录页',
                    component: Login
                },
                {
                    path: '/backend',
                    name: '后台',
                    component: BackendIndex,
                    children: [
                        {
                            path: '/backend/articles',
                            name: '文章发布页',
                            component: PublishArticles
                        },
                        {
                            path: '/backend/article/:id',
                            name: '文章修改页',
                            component: ModifyArticle
                        },
                        {
                            path: '/backend/settings',
                            name: '系统设置页',
                            component: Settings                            
                        }
                    ]
                }
            ]
        }
    ]
})

export {
    routerInfo as router,
    hookHandler as routerHandler
}