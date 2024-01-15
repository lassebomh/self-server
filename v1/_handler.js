(async () => {
    let serverUrl = new URL('http://sandbox.localhost:5500/_init.html')
    
    let container = document.getElementById('iframe-container')
    
    let files = {
        '/server.js': await (await fetch('v1/server.js')).text(),
        '/_lib.js': await (await fetch('v1/_lib.js')).text(),
        '/_server.html': await (await fetch('v1/_server.html')).text(),
        '/templates/index.html': await (await fetch('v1/templates/index.html')).text(),
        '/templates/button.html': await (await fetch('v1/templates/button.html')).text(),
        '/public/style.css': await (await fetch('v1/public/style.css')).text(),
    }
    
    window.addEventListener('message', (e) => {
        if (e.origin !== serverUrl.origin) return
        
        if (e.data.type == 'init') {
            e.source.postMessage({
                type: 'init',
                value: files['/_server.html'],
            }, e.origin)

        } else if (e.data.type == 'fetch-files') {
            e.source.postMessage({
                type: 'fetch-files',
                value: files,
            }, e.origin)
        }
    })
    
    let serverIframe = document.createElement('iframe')
    serverIframe.src = serverUrl.href
    container.appendChild(serverIframe)
    
})()