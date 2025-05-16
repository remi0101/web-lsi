import {createRouter, createWebHistory} from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import BaseLayout from "./components/BaseLayout.vue";
import NotFound from "./components/NotFound.vue";

const routes = [
    {
        path: '/',
        component:  BaseLayout,
        children : [
            {path: '', name:"HomePage", component: HelloWorld},
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