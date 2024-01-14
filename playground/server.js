
import { router } from './selfserver-ext.js';

let counter = 0;

router.get('/', (request) => {
    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>API Mocking Example<\/title>
            <script src="https:\/\/unpkg.com\/htmx.org@1.9.10"><\/script>
        <\/head>
        <body>
            <button hx-get="\/increment" hx-swap="innerHTML">
                Fetch
            <\/button>
        <\/body>
        <\/html>
        `,
        {
            status: 200,
            statusText: 'OK',
            headers: {'Content-Type': 'text/html'}
        }
    )
})

router.get('/increment', (request) => {
    counter++;

    return new Response(counter.toString(), {
        status: 200,
        statusText: 'OK',
        headers: {'Content-Type': 'text/html'}
    });
})

router.listen();