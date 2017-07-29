import Vue from 'vue';
import Router from 'vue-router';

import Child from '@src/components/Child.vue';
import Home from '@src/components/Home.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        }, {
            path: '/child',
            name: 'Child',
            component: Child,
        }],
    });
}
