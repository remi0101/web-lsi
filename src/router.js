import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "./pages/HelloWorld.vue";
import BaseLayout from "./components/BaseLayout.vue";
import NotFound from "./pages/NotFound.vue";
import MailList from "./pages/MailList.vue";
import MailView from "./pages/MailView.vue";
import MailCreate from "./pages/MailCreate.vue";

const routes = [
    {
        path: '/',
        component:  BaseLayout,
        children : [
            {path: '', name:"HomePage", component: HelloWorld},
            {path: '/mails', name:'MailsList', component: MailList},
            {path: 'mails/:id', name:"MailDetail", component: MailView},
            {path: 'mails/new', name:"MailNew", component: MailCreate},
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

export default router