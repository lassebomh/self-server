import { Router } from 'https://www.unpkg.com/tiny-request-router@1.2.2/dist/router.browser.mjs';

export var router = new Router();

router.listen = () => {
    window.requestHandler = async (request) => {
        const url = new URL(request.url);
        const match = router.match(request.method, url.pathname)

        if (match == null) {
            return new Response(null, {status: 404});
        }

        try {
            return await match.handler(request, match.params)
        } catch (error) {
            console.error(error)
            return new Response(null, {status: 500});
        }
    }
    
    window.parent.postMessage({type: "ready"}, '*')
}