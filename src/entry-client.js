import { createApp } from '@src/js/app'

const { app, router, store } = createApp()

try {
    const meta = document.querySelector('meta[name="initial-state"]');
    const state = JSON.parse(meta.getAttribute('content'));
    store.replaceState(state);
} catch(e) {
    console.error('Error hydrating initial state', e);
}

app.$mount('#app')
