import Vue from 'vue';

import { createRouter } from '@src/js/router';
import store from '@src/js/store';

import App from '@src/components/App.vue';

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
    const router = createRouter();

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    });

    return { app, router, store };
}
