// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router, routerHandler } from './router'
import Vuelidate from 'vuelidate'
import VueCookie from 'vue-cookie'

Vue.use(Vuelidate)
Vue.use(VueCookie)

Vue.config.productionTip = false

// add global router hooks
routerHandler.global(router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
