
let messageId = 0;

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    
    const id = messageId++;
    const messageChannel = new MessageChannel();

    const requestUrl = new URL(event.request.url);

    console.log('sw got request', event.request);

    if (requestUrl.origin != self.location.origin) return

    if (requestUrl.origin == self.location.origin) {
        if (requestUrl.pathname == '/mockserver.html') return
        
        if (event.request.referrer != "") {
            const referrerUrl = new URL(event.request.referrer);
            if (referrerUrl.pathname == '/mockserver.html') return
        }
    }
    
    event.respondWith(new Promise(async (resolve, reject) => {
        messageChannel.port1.onmessage = (responseEvent) => {

            const responseId = responseEvent.data.id;
            const response = responseEvent.data.response;
            
            if (responseId !== id) {
                console.warn('sw got WRONG response from client');
                return
            };

            console.log('sw got response', response);

            const newResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers
            });

            console.log('sw responding to', responseId);

            resolve(newResponse);
        };

        const serializedRequest = {
            id: id,
            request: {
                url: event.request.url,
                method: event.request.method,
                headers: Object.fromEntries(event.request.headers.entries()),
            }
        };

        const allClients = await clients.matchAll({includeUncontrolled: true});

        console.log(allClients);

        let mockServer;

        for (const client of allClients) {
            const url = new URL(client.url);

            if (url.pathname === "/mockserver.html") {
                mockServer = client;
                break
            }
        }

        console.log(mockServer);
        
        mockServer.postMessage(serializedRequest, [messageChannel.port2]);
    }));
});