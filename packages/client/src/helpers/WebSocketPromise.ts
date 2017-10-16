function getWebSocket(websocketPath) {

    return new Promise<WebSocket>((resolve, reject) => {
        const ws = new WebSocket(websocketPath);
        const onOpen = () => resolve(ws);
        const onError = () => {
            ws.removeEventListener('error', onError);

            return reject(ws);
        };

        ws.addEventListener('open', onOpen);
        ws.addEventListener('close', onError);
    });
}

export {
    getWebSocket,
};
