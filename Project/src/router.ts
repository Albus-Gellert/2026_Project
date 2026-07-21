import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import ExplorerPage from './pages/ExplorerPage.vue'

const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/explorer', name: 'explorer', component: ExplorerPage },
    { path: '/demo', redirect: '/explorer' },
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ top: 0, left: 0 }),
})
