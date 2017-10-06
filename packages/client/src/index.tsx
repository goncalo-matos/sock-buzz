const websocketPath = 'ws://0.0.0.0:9191';

const websocketPromise = new Promise<WebSocket>((resolve, reject) => {
    const ws = new WebSocket(websocketPath);
    const onOpen = () => resolve(ws);
    const onError = () => {
        ws.removeEventListener('error', onError);

        return reject(ws);
    };

    ws.addEventListener('open', onOpen);
    ws.addEventListener('close', onError);
});

websocketPromise
    .then((ws) => {
        ws.addEventListener('message', (e) => {
            console.log(e.data);
        });
    });
