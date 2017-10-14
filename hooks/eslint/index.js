/* eslint max-len: ["error", { "ignoreTemplateLiterals": true }] */
const fs = require('fs-extra');
const packageJsonHelper = require('./../../utils/packageJsonHelper');
const emoji = require('node-emoji');
const chalk = require('chalk');
const spawn = require('./../../utils/spawnHelper');

const { loadPackageJsonFromPath, savePackageJsonIn } = packageJsonHelper;

const question = {
  name: 'eslint',
  type: 'confirm',
  message: 'Would you like to include eslint?',
};

const installPackagesSuccess = (cwd, folderName) =>
  loadPackageJsonFromPath(`${cwd}/${folderName}/package.json`)
    .then(d => {
      const data = d;
      data.scripts.eslint = 'eslint .';
      data.scripts.precommit = 'lint-staged';
      data['lint-staged'] = {
        '*.js': [
          'eslint --cache --max-warnings 0',
        ],
      };

      return savePackageJsonIn(`${cwd}/${folderName}/package.json`, data);
    });

const addEslintFileSuccess = (cwd, folderName) => {
  const eslintDependencies = [
    'eslint',
    'eslint-config-airbnb',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-import',
    'eslint-plugin-react',
    'babel-eslint',
    'lint-staged',
    'husky',
  ];

  const command = `npm i ${eslintDependencies.join(' ')} --save-dev`;

  const terminalOpts = {
    cwd: `${cwd}/${folderName}`,
    shell: true,
    stdio: 'inherit',
  };

  return spawn(command, [], terminalOpts)
    .then(() => installPackagesSuccess(cwd, folderName));
};

const func = (cwd, folderName) => {
  console.log('\n\n');
  console.log(`${emoji.get('fire')}  ${chalk.cyan('Installing eslint')} ${emoji.get('fire')}`);
  console.log('\n\n');

  return fs
    .copy(`${__dirname}/.eslintrc.json`, `${cwd}/${folderName}/.eslintrc.json`)
    .then(() => addEslintFileSuccess(cwd, folderName));
};

const action = {
  type: 'eslint',
  func,
};

module.exports = {
  action,
  question,
};
