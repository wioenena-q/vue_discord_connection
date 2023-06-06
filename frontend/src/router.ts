import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/:patchMatch(.*)*",
        name: "Not Found",
        component: NotFound
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: true
});