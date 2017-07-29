import Vue from 'vue';

const mutations = {
    SET_DATA: 'SET_DATA',
};

/* eslint-disable no-param-reassign */
const handlers = {
    [mutations.SET_DATA](state, payload) {
        state.data = payload.data;
    },
};
/* eslint-enable no-param-reassign */

export default {
    mutations,
    handlers,
};
