
export function register(requestHandler) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceworker.js').then(() => {
            console.log('Service Worker registered');
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    }

    navigator.serviceWorker.onmessage = async (event) => {

        const response = await requestHandler(event.data.request);
        const clonedResponse = response.clone();
        const body = await clonedResponse.blob();
        const headers = Object.fromEntries(response.headers.entries());
        
        const serializedResponse = {
            body: body,
            status: response.status,
            statusText: response.statusText,
            headers: headers
        };

        console.log(event.ports);

        event.ports[0].postMessage({ id: event.data.id, response: serializedResponse });
    };
}
