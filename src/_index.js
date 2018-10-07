'use strict';

const cp = require('child_process');

module.exports = function nodeDebugHelper(execArgv) {
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

  function getPort() {
    let port;
    for (let i = parentPort + 1; !port; i++) {
      if (!portsInUse[i]) {
        port = i;
      }
    }
    portsInUse[port] = true;
    return port;
  }

  function releasePort(port) {
    delete portsInUse[port];
  }

  return {
    isDebug,
    getPort,
    releasePort,

    fork(modulePath, args, options) {
      let port;
      if (isDebug) {
        options = options || {};
        let execArgv = options.execArgv = options.execArgv || [];

        port = getPort();
        execArgv.push(`--debug=${port}`);
      }

      let fork = cp.fork(modulePath, args, options);

      fork.on('exit', () => {
        if (port) {
          releasePort(port);
        }
      });

      return fork;
    }
  };
};
