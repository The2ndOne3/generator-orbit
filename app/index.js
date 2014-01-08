'use strict';

var util = require('util')
  , path = require('path')
  , yeoman = require('yeoman-generator')
  , chalk = require('chalk');


var OrbitGenerator = module.exports = function OrbitGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(OrbitGenerator, yeoman.generators.Base);

OrbitGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Banner.
  console.log(chalk.blue('     ,\'""`. '));
  console.log(chalk.blue('    / _  _ \\'));
  console.log(chalk.blue('    |(@)(@)|  '), chalk.white.bold('Release the Kraken!'));
  console.log(chalk.blue('    )  __  ('));
  console.log(chalk.blue('   /,\'))((`.\\ '));
  console.log(chalk.blue('  (( ((  )) ))'));
  console.log(chalk.blue('   `\\ `)(\' /\''));
  console.log('');

  // Prompts.
  var prompts = [{
    name: 'name',
    message: 'Application name',
  }, {
    name: 'author',
    message: 'Application author',
  }, {
    name: 'description',
    message: 'Application description',
  // }, {
  //   type: 'list',
  //   choices: ['Jade', 'Blade', 'none'],
  //   // choices: ['Jade', 'Blade', 'Dust', 'none'],
  //   name: 'templates',
  //   message: 'Client-side templating engine',
  // }, {
  //   type: 'list',
  //   choices: ['Stylus', 'none'],
  //   // choices: ['Stylus', 'LESS', 'SASS', 'SCSS', 'none'],
  //   name: 'css',
  //   message: 'CSS preprocessor',
  // }, {
  //   type: 'confirm',
  //   name: 'passportjs',
  //   message: 'Use PassportJS',
  // }, {
  //   type: 'confirm',
  //   name: 'sockets',
  //   message: 'Use Socket.IO',
  }, {
    type: 'confirm',
    name: 'requirejs',
    message: 'Use RequireJS',
  }, ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.author = props.author;
    this.description = props.description;
    this.requirejs = props.requirejs;

    cb();
  }.bind(this));
};

OrbitGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

OrbitGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
