'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


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

  // have Yeoman greet the user.
  console.log(this.yeoman);

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
