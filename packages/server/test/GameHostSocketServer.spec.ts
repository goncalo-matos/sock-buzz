import { expect, use } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { createStubInstance, match, sandbox, SinonSandbox } from 'sinon';
import * as sinonChai from 'sinon-chai';

use(sinonChai);

import * as WebSocket from 'ws';
import { GameHostSocketServer } from '../src/GameHostSocketServer';

describe('HostSocketServer', function () {
    let hostSocketServer: GameHostSocketServer;
    let stubSandbox: SinonSandbox;

    beforeEach(function () {
        stubSandbox = sandbox.create();

        hostSocketServer = new GameHostSocketServer();
    });

    afterEach(function () {
        stubSandbox.restore();
    });

    describe('when starting the server', function () {
        beforeEach(function () {
            const serverStub = createStubInstance<WebSocket.Server>(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            hostSocketServer.startServer(999);
        });

        it('should start server in the given port', function () {
            expect(WebSocket.Server).to.have.been.calledWith({ port: 999 });
        });
    });

    describe('when sending the player push order', function () {
        let clientStub: sinon.SinonStubbedInstance<WebSocket>;

        beforeEach(function () {
            const serverStub = createStubInstance(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            hostSocketServer.startServer(999);

            // add the user
            clientStub = createStubInstance<WebSocket>(WebSocket);

            serverStub.on
                .withArgs('connection', match.func)
                .callArgWith(1, clientStub, { connection: { remoteAddress: '1' } });

            hostSocketServer.sendPlayerPushOrder([{ player: { name: 'name' }, time: new Date(1990, 0, 1) }]);
        });

        it('should send the given order', function () {
            expect(clientStub.send).to.have.been
                .calledWithExactly('[{"player":{"name":"name"},"time":"1990-01-01T00:00:00.000Z"}]');
        });
    });
});
