(async () => {
    let serverUrl = new URL('http://sandbox.localhost:5500/mockserver.html')
    
    let serverContainer = document.getElementById('sandbox-server-container')
    let sandboxContainer = document.getElementById('sandbox-container')
    
    let serverIframe = document.createElement('iframe')
    serverIframe.src = serverUrl.href
    serverIframe.width = 200
    serverIframe.height = 200
    serverContainer.appendChild(serverIframe)
    
    let files = {
        '/server.js': await (await fetch('playground/server.js')).text(),
        '/selfserver-ext.js': await (await fetch('playground/selfserver-ext.js')).text(),
    }
    
    window.addEventListener('message', (e) => {
        if (e.origin !== serverUrl.origin) return
        
        console.log(e.data);

        if (e.data.type == 'init') {
            e.source.postMessage({
                type: 'init',
                value: files,
            }, e.origin)
        } else if (e.data.type == 'ready') {
            let playgroundIframe = document.createElement('iframe')
            playgroundIframe.src = serverUrl.origin + "/"
            playgroundIframe.width = 200
            playgroundIframe.height = 200
            sandboxContainer.appendChild(playgroundIframe)
        }
    })
})()