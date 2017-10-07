import { expect, use } from 'chai';
import { afterEach, beforeEach, describe, it } from 'mocha';
import { createStubInstance, match, sandbox, SinonSandbox } from 'sinon';
import * as sinonChai from 'sinon-chai';

use(sinonChai);

import * as WebSocket from 'ws';
import { PlayerSocketServer } from '../src/PlayerSocketServer';

describe('PlayerSocketServer', function () {
    let playerSocketServer: PlayerSocketServer;
    let stubSandbox: SinonSandbox;

    beforeEach(function () {
        stubSandbox = sandbox.create();

        playerSocketServer = new PlayerSocketServer();
    });

    afterEach(function () {
        stubSandbox.restore();
    });

    describe('when starting the server', function () {
        beforeEach(function () {
            const serverStub = createStubInstance<WebSocket.Server>(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            playerSocketServer.startServer(999);
        });

        it('should start server in the given port', function () {
            expect(WebSocket.Server).to.have.been.calledWith({port: 999});
        });
    });

    describe('when starting a question', function () {
        let client1Stub: sinon.SinonStubbedInstance<WebSocket>;
        let client2Stub: sinon.SinonStubbedInstance<WebSocket>;

        beforeEach(function () {
            const serverStub = createStubInstance(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            playerSocketServer.startServer(999);

            // add two users
            client1Stub = createStubInstance<WebSocket>(WebSocket);
            client2Stub = createStubInstance<WebSocket>(WebSocket);

            serverStub.on.callArgWith(1, client1Stub, { connection: { remoteAddress: '1' } });
            serverStub.on.callArgWith(1, client2Stub, { connection: { remoteAddress: '2' } });

            playerSocketServer.startQuestion();
        });

        it('should broadcast START to all users', function () {
            expect(client1Stub.send).to.have.been.calledWith('START');
            expect(client2Stub.send).to.have.been.calledWith('START');
        });
    });

    describe('when stopping a question', function () {
        let client1Stub: sinon.SinonStubbedInstance<WebSocket>;
        let client2Stub: sinon.SinonStubbedInstance<WebSocket>;

        beforeEach(function () {
            const serverStub = createStubInstance(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            playerSocketServer.startServer(999);

            // add two users
            client1Stub = createStubInstance<WebSocket>(WebSocket);
            client2Stub = createStubInstance<WebSocket>(WebSocket);

            serverStub.on
                .withArgs('connection', match.func)
                .callArgWith(1, client1Stub, { connection: { remoteAddress: '1' } });
            serverStub.on
                .withArgs('connection', match.func)
                .callArgWith(1, client2Stub, { connection: { remoteAddress: '2' } });

            playerSocketServer.stopQuestion();
        });

        it('should broadcast STOP to all users', function () {
            expect(client1Stub.send).to.have.been.calledWith('STOP');
            expect(client2Stub.send).to.have.been.calledWith('STOP');
        });
    });

    describe('when a user disconnects', function () {
        let clientStub: sinon.SinonStubbedInstance<WebSocket>;

        beforeEach(function () {
            const serverStub = createStubInstance(WebSocket.Server);

            stubSandbox.stub(WebSocket, 'Server').returns(serverStub);
            playerSocketServer.startServer(999);

            // add a user
            clientStub = createStubInstance<WebSocket>(WebSocket);
            serverStub.on
                .withArgs('connection', match.func)
                .callArgWith(1, clientStub, { connection: { remoteAddress: '1' } });

            clientStub.on
                .withArgs('close', match.func)
                .callArgWith(1, clientStub, { connection: { remoteAddress: '1' } });

            // broadcast
            playerSocketServer.stopQuestion();
        });

        it('should stop receiving broadcasts', function () {
            expect(clientStub.send).to.not.have.been.called;
        });
    });
});
