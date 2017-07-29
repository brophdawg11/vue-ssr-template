<template>
    <div>
        <h1>Home view</h1>

        <p>
            Server rendered data: {{ data }}
        </p>

        <div>
            Change the data:
            <input v-model="data" />
        </div>

        <router-link to="/child">Child</router-link>
    </div>
</template>

<script>
import mutations from '@src/js/mutations';

const SET_DATA = mutations.mutations.SET_DATA;

export default {
    name: 'home',
    // Fetch any async data needed to render this component on the server
    fetchData({ store }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = 'Home data from the server';
                store.commit(SET_DATA, { data });
                resolve();
            }, 1000);
        });
    },
    computed: {
        data: {
            get() {
                return this.$store.state.data;
            },
            set(data) {
                this.$store.commit(SET_DATA, { data });
            },
        },
    },
};
</script>

<style scoped>
</style>
