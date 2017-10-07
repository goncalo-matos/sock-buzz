import {GameHostSocketServer} from './GameHostSocketServer';
import {PlayerSocketServer} from './PlayerSocketServer';

const playerSocketServer = new PlayerSocketServer();
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
