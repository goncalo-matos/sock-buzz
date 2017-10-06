import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import * as index from '../src/index';

@suite
class HelloTest {

    private victim: string;

    public before() {
        this.victim = index.hello();
    }

    @test('should return hello world')
    public return() {
        expect(this.victim).to.equal('hello world!');
    }
}
