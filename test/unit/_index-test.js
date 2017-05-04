'use strict';

const expect = require('chai').expect;
const debug = require('../../src/_index');

describe('unit', function() {
  describe('isDebug', function() {
    it('false', function() {
      let result = debug({
      });

      expect(result.isDebug).to.be.false;
    });

    describe('true', function() {
      it('debug', function() {
        let result = debug({
          'debug': true
        });

        expect(result.isDebug).to.be.true;
      });

      it('debug-brk', function() {
        let result = debug({
          'debug-brk': true
        });

        expect(result.isDebug).to.be.true;
      });

      it('inspect', function() {
        let result = debug({
          'inspect': true
        });

        expect(result.isDebug).to.be.true;
      });
    });
  });

  describe('getPort', function() {
    it('default', function() {
      let result = debug({
      });

      expect(result.getPort()).to.equal(5859);
    });

    it('debug 1234', function() {
      let result = debug({
        'debug': 1234
      });

      expect(result.getPort()).to.equal(1235);
    });

    it('debug true', function() {
      let result = debug({
        'debug': true
      });

      expect(result.getPort()).to.equal(5859);
    });

    it('debug-brk 32892', function() {
      let result = debug({
        'debug-brk': 32892
      });

      expect(result.getPort()).to.equal(32893);
    });

    it('debug-brk true', function() {
      let result = debug({
        'debug-brk': true
      });

      expect(result.getPort()).to.equal(5859);
    });

    it('inspect 9282', function() {
      let result = debug({
        'inspect': 9282
      });

      expect(result.getPort()).to.equal(9283);
    });

    it('inspect true', function() {
      let result = debug({
        'inspect': true
      });

      expect(result.getPort()).to.equal(9230);
    });
  });

  describe('releasePort', function() {
    it('releases single port', function() {
      let result = debug({
      });

      let firstPort = result.getPort();
      result.releasePort(firstPort);
      let secondPort = result.getPort();

      expect(secondPort).to.equal(firstPort);
    });

    it('reclaims top port', function() {
      let result = debug({
      });

      result.getPort();
      let secondPort = result.getPort();
      result.releasePort(secondPort);
      let thirdPort = result.getPort();

      expect(thirdPort).to.equal(secondPort);
    });

    it('reclaims earlier port', function() {
      let result = debug({
      });

      let firstPort = result.getPort();
      result.getPort();
      result.releasePort(firstPort);
      let thirdPort = result.getPort();

      expect(thirdPort).to.equal(firstPort);
    });
  });
});
