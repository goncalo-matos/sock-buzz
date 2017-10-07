import {PlayerSocketServer} from './PlayerSocketServer';

const playerSocketServer = new PlayerSocketServer();

playerSocketServer.startServer(9191);
playerSocketServer.startQuestion();
