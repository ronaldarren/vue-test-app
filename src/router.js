import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyRecipes from './views/MyRecipes.vue';
import Menu from './views/Menu.vue';
import Signin from './views/Signin.vue';
import Join from './views/Join.vue';
import Calendar from './views/Calendar.vue';
import Profile from './views/Profile.vue';
import store from '@/store.js';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/my-recipes',
            name: 'my-recipes',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('./views/MyRecipes.vue'),
            component: MyRecipes,
            meta: {
                authRequired: true
            }
        },
        {
            path: '/menu',
            name: 'menu',
            component: Menu,
            // component: () => import('./views/Menu.vue'),
            meta: { authRequired: true }
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: Signin
            // component: () => import('./views/Signin.vue')
        },
        {
            path: '/join',
            name: 'join',
            component: Join
            // component: () => import('./views/Join.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: Calendar,
            // component: () => import('./views/Calendar.vue'),
            meta: {
                authRequired: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            // component: () => import('./views/Profile.vue'),
            meta: {
                authRequired: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/sign-in'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
