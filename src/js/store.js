import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createLogger()
    ],
    state: {
        data: null,
    },
    mutations: {
        SET_DATA(state, payload) {
            state.data = payload.data;
        }
    },
    actions: {

    },
});

