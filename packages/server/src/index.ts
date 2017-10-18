import {GameHostSocketServer} from './GameHostSocketServer';
import {PlayerSocketServer} from './PlayerSocketServer';

const playerSocketServer = new PlayerSocketServer({
    onBuzz: (player) => {
        gameHostSocketServer.sendPlayerBuzz({player, time: new Date()});
    },
});
const gameHostSocketServer = new GameHostSocketServer({
    start: () => {
        playerSocketServer.startQuestion();
    },
    stop: () => {
        playerSocketServer.stopQuestion();
    },
});

playerSocketServer.startServer(9191);
gameHostSocketServer.startServer(9292);

import * as express from 'express';
import * as path from 'path';

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.resolve(__dirname, '../../client/dist/')));

app.get('/', (request, response) => {
    response.sendFile('index.html');
});

app.listen(app.get('port'), function() {
    // tslint:disable-next-line:no-console
    console.log('Node app is running on port', app.get('port'));
});
