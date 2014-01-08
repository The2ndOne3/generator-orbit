'use strict';

var util = require('util')
  , path = require('path')
  , yeoman = require('yeoman-generator')
  , figlet = require('figlet')
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
  figlet('Orbit', function(err, data){
      var messages = [
        '      To infinity...!',
        ' Houston, we have lift-off.',
        ' Set up web apps in less than 12 parsecs.',
        ' It\'s not brain surgery.',
        ' It\'s not rocket science... wait.'
      ];
      var message = messages[Math.floor(Math.random() * messages.length)];

      if(err){
        return console.error('Something went wrong.');
      }
      console.log(chalk.blue(data));
      console.log(chalk.white.bold(message));
      console.log();

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
    }.bind(this));
};

OrbitGenerator.prototype.app = function app() {
  this.template('_Gruntfile.js', 'Gruntfile.js');

  this.copy('app.js', 'app.js');
  this.copy('server.js', 'server.js');

  this.copy('bin/orbit.js', 'bin/orbit.js');

  this.copy('controllers/index.js', 'controllers/index.js');

  this.copy('lib/auth.js', 'lib/auth.js');
  this.copy('lib/sockets.js', 'lib/sockets.js');

  this.template('models/_index.js', 'models/index.js');

  this.mkdir('public/components');

  this.copy('public/css/app.styl', 'public/css/app.styl');

  this.mkdir('public/images');

  this.copy('public/js/.jshintignore', 'public/js/.jshintignore');
  this.copy('public/js/.jshintrc', 'public/js/.jshintrc');
  if(this.requirejs){
    this.copy('public/js/app.js', 'public/js/app.js');
    this.copy('public/js/config.js', 'public/js/config.js');
  }

  this.copy('public/templates/index.blade', 'public/templates/index.blade');
  this.copy('public/templates/layouts/master.blade', 'public/templates/layouts/master.blade');

  this.copy('test/index.js', 'test/index.js');

  this.copy('views/index.blade', 'views/index.blade');
  this.copy('views/layouts/master.blade', 'views/layouts/master.blade');
  this.copy('views/errors/404.blade', 'views/errors/404.blade');
  this.copy('views/errors/500.blade', 'views/errors/500.blade');

  this.copy('Procfile', 'Procfile');
};

OrbitGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('.bowerrc', '.bowerrc');
  this.copy('.editorconfig', '.editorconfig');
  this.copy('.gitignore', '.gitignore');
  this.copy('.jshintrc', '.jshintrc');
  this.copy('.nodemonignore', '.nodemonignore');
  this.copy('.travis.yml', '.travis.yml');

  this.template('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');

  this.copy('LICENSE', 'LICENSE');
  this.copy('README.md', 'README.md');
};
