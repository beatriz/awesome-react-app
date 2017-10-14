const spawn = require('cross-spawn');

const spawnPromise = (command, args, options) =>
  new Promise((resolve, reject) => {
    const execution = spawn(command, args, options);

    execution.on('close', () => {
      resolve();
    });

    execution.on('error', () => {
      reject();
    });
  });

module.exports = spawnPromise;
