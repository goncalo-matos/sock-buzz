import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 9191 });

wss.on('connection', (ws) => {
    ws.send('hello world!');
});
