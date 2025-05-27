import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "./pages/HomePage.vue";
import BaseLayout from "./components/BaseLayout.vue";
import NotFound from "./pages/NotFound.vue";
import MailList from "./pages/MailList.vue";
import MailView from "./pages/MailView.vue";
import MailCreate from "./pages/MailCreate.vue";
import store from "./store/user.js";

const routes = [
    {
        path: '/',
        component:  BaseLayout,
        children : [
            {path: '', name:"HomePage", component: HelloWorld},
            {path: '/mails', name:'MailsList', component: MailList, meta: {requiresAuth: true}},
            {path: 'mails/:id', name:"MailDetail", component: MailView, meta: {requiresAuth: true}},
            {path: 'mails/new', name:"MailNew", component: MailCreate, meta: {requiresAuth: true}},
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = store.getters.user
    if(to.meta.requiresAuth && !user) {
        return next('/')
    }
    return next();
})

export default router