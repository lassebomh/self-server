
import { router, render } from '/_lib.js';

let counter = 0;

router.get('/', (request) => {
    return render(request, 'index.html', {hello: "HELLO!", text: "Click me!"})
})

router.post('/increment', (request) => {
    counter++;

    return render(request, 'button.html', {text: counter})
})

router.listen();