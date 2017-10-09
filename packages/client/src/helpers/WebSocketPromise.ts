function getWebSocket(websocketPath, { binaryType = 'arraybuffer' } = {}) {

    return new Promise<WebSocket>((resolve, reject) => {
        const ws = new WebSocket(websocketPath);
        const onOpen = () => resolve(ws);
        const onError = () => {
            ws.removeEventListener('error', onError);

            return reject(ws);
        };

        ws.binaryType = binaryType;
        ws.addEventListener('open', onOpen);
        ws.addEventListener('close', onError);
    });
}

export {
    getWebSocket,
};
