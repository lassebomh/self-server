# Self Serve(r)

![Self Server](./important.jpg)

This repository turns a tab into a mock server, that can handle requests coming from its own domain.

For example:

 - `/index.html` is opened on localhost, and an iframe on `http://sandbox.localhost/mockserver.html` is created.
 - The iframe starts a service worker, retrieves the sandbox project files, and runs `server.js` as a module.
 - A new iframe is created for `http://sandbox.localhost/`, which now gets its responses from the mock server.