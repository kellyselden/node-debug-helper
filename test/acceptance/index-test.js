'use strict';

const { expect } = require('chai');
const cp = require('child_process');

describe('acceptance', function() {
  describe('isDebug', function() {
    it('false', function(done) {
      let fork = cp.fork('test/is-debug', [], {
      });

      fork.on('message', isDebug => {
        fork.kill('SIGINT');

        expect(isDebug).to.be.false;

        done();
      });
    });

    it('true --debug', function(done) {
      let fork = cp.fork('test/is-debug', [], {
        execArgv: ['--debug']
      });

      fork.on('message', isDebug => {
        fork.kill('SIGINT');

        expect(isDebug).to.be.true;

        done();
      });
    });

    // it('true --debug-brk=10000', function(done) {
    //   let fork = cp.fork(`${__dirname}/is-debug.js`, [], {
    //     execArgv: [
    //       '--debug-brk=10000'
    //       // ,
    //       // '-i'
    //     ],
    //     silent: true
    //   });

    //   fork.stdin.setEncoding = 'utf-8';
    //   fork.stdin.write('c\n');
    //   fork.stdin.end();

    //   fork.on('message', isDebug => {
    //     fork.kill('SIGINT');

    //     expect(isDebug).to.be.true;

    //     done();
    //   });
    // });
  });
});
