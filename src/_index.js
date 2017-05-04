'use strict';

module.exports = function(execArgv) {
  execArgv = execArgv || {};

  let isDebug = false;
  let parentPort = 5858;

  if (execArgv['debug']) {
    isDebug = true;
    if (typeof execArgv['debug'] === 'number') {
      parentPort = execArgv['debug'];
    }
  } else if (execArgv['debug-brk']) {
    isDebug = true;
    if (typeof execArgv['debug-brk'] === 'number') {
      parentPort = execArgv['debug-brk'];
    }
  } else if (execArgv['inspect']) {
    isDebug = true;
    if (typeof execArgv['inspect'] === 'number') {
      parentPort = execArgv['inspect'];
    } else {
      parentPort = 9229;
    }
  }

  let portsInUse = {};

  return {
    isDebug,
    getPort() {
      let port;
      for (let i = parentPort + 1; !port; i++) {
        if (!portsInUse[i]) {
          port = i;
        }
      }
      portsInUse[port] = true;
      return port;
    },
    releasePort(port) {
      delete portsInUse[port];
    }
  };
};
