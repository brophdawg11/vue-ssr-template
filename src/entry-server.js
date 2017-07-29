import { createApp } from '@src/js/app';

function initServerRender(context) {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url);

        router.onReady(() => {
            const components = router.getMatchedComponents();

            if (!components.length) {
                console.log('No matched components');
                return reject({ code: 404 });
            }

            // Parameters to pass to component fetchData methods
            const params = {
                store,
                route: router.currentRoute,
            };

            // Execute all component fetchData methods in parallel
            const promises = components.map(c =>
                c.fetchData && c.fetchData(params));

            return Promise.all(promises)
                // Set initialState for client hydration
                .then(() => Object.assign(context, {
                    initialState: JSON.stringify(store.state),
                }))
                .then(() => resolve(app))
                .catch(e => reject(e));
        }, reject);
    });
}

export default initServerRender;
