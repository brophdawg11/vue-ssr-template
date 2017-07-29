import { createApp } from '@src/js/app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();

            if (!matchedComponents.length) {
                console.log('No matched components');
                return reject({ code: 404 });
            }

            console.log('Fetching async data for component server side');

            Promise.all(matchedComponents.map(c => c.fetchData && c.fetchData({
                store,
                route: router.currentRoute
            }))).then(() => {
                context.initialState = JSON.stringify(store.state);
                resolve(app);
            }, reject);
        }, reject);
    });
}
