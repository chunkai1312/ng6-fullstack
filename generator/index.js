'use strict';

const path = require('path');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const _ = require('lodash');
const strman = require('strman');
const co = require('co');
const component = process.argv[2];
const root = path.normalize(`${__dirname}/..`);
const componentTemplatePath = path.join(root, 'generator/templates/component');

if (!component) {
  console.log('  Usage:');
  console.log('  $ npm run generator:component [name]');
  process.exit();
}

let questions = [
  {
    type: 'input',
    name: 'path',
    message: 'Where would you like to create this component?',
    default: () => `src/client/app/components/${strman.toKebabCase(component)}`,
  },
  {
    type: 'input',
    name: 'module',
    message: 'What module name would you like to use?',
    default: () => `app.components.${strman.toCamelCase(component)}`,
  },
];

co(function* () {
  let answers = yield inquirer.prompt(questions);

  let variables = {
    component: strman.toCamelCase(component),
    controller: `${strman.toStudlyCaps(component)}Controller`,
    filename: strman.toKebabCase(component),
    module: answers.module,
  };

  let destinationPath = path.join(root, answers.path);
  if (fs.existsSync(destinationPath)) {
    console.log();
    console.log('  Destination path already exists.');
    process.exit();
  }

  console.log();
  fs.copySync(componentTemplatePath, destinationPath);

  fs.walk(destinationPath)
    .on('data', function (item) {
      if (item.stats.isDirectory()) return;

      let temp = fs.readFileSync(item.path, 'utf-8');
      let compiled = _.template(temp);
      let result = compiled(variables);
      fs.writeFileSync(item.path, result, 'utf-8');

      let dir = path.dirname(item.path);
      let base = path.basename(item.path).replace('temp', variables.filename);
      let newPath = path.format({ dir, base });
      fs.renameSync(item.path, newPath);

      console.log('  \x1b[36mcreate\x1b[0m : ' + newPath);
    })
    .on('end', function () {
      console.log();
      console.log('  Done.');
      process.exit();
    });
}).catch(err => {
  console.log(err);
  process.exit(1);
});
