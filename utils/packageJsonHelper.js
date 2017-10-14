const fs = require('fs');

const loadPackageJsonFromPath = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, rawData) => {
      const data = rawData.toString();

      return err ? reject(err) : resolve(JSON.parse(data));
    });
  });

const savePackageJsonIn = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data, null, 4), err =>
      err ? reject(err) : resolve(true));
  });

module.exports = {
  loadPackageJsonFromPath,
  savePackageJsonIn,
};
