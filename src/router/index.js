import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/Home.vue'
import chat from '../views/Chat.vue'
Vue.use(Router)
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    // linkActiveClass: 'is-active',
    routes: [
        // { path: '/post/:key', component: Post },
        // { path: '/author/:author', component: AuthorPost },
        // { path: '/location/:location/:page(\\d+)?', component: LocationPost },
        { path: '/', component: home },
        { path: '/chat', component: chat },
        // ...getRouters()
    ]
})