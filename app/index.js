'use strict';

var util = require('util')
  , path = require('path')

  , yeoman = require('yeoman-generator')
  , updateNotifier = require('update-notifier')

  , figlet = require('figlet')
  , chalk = require('chalk')
  , moniker = require('moniker');

var OrbitGenerator = module.exports = function OrbitGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var notifier = updateNotifier({
    packagePath: '../package'
  });
  if(notifier.update){
    notifier.notify();
  }

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
      ' It\'s not rocket science... wait...'
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
      type: 'confirm',
      name: 'newdir',
      message: 'Make in new directory',
      default: true
    // }, {
    //   type: 'confirm',
    //   name: 'noob',
    //   message: 'First time using Orbit?',
    //   default: false
    }, {
      name: 'name',
      message: 'Application name',
      default: moniker.choose(),
    }, {
      name: 'author',
      message: 'Application author',
      default: 'Bill Builder <bill@email.org>',
    }, {
      name: 'description',
      message: 'Application description',
      default: 'Does cool things!',
    }, {
      type: 'list',
      choices: ['jade', 'blade', 'ejs', 'dust', 'none'],
      name: 'server_view',
      message: 'Server-side templating engine',
      default: 'jade',
    // }, {
    //   type: 'list',
    //   choices: ['jade', 'blade', 'ejs', 'dust', 'none'],
    //   name: 'client_view',
    //   message: 'Client-side templating engine',
    //   default: 'jade',
    }, {
      type: 'list',
      choices: ['stylus', 'less', 'sass', 'none'],
      name: 'css',
      message: 'CSS preprocessor',
      default: 'stylus',
    // }, {
    //   type: 'confirm',
    //   name: 'passport',
    //   message: 'Use PassportJS',
    //   default: false,
    // }, {
    //   type: 'list',
    //   name: 'database',
    //   message: 'Database',
    //   choices: ['mongodb', 'mysql', 'mariadb', 'scss', 'none'],
    //   default: 'none',
    }, {
      type: 'confirm',
      name: 'requirejs',
      message: 'Use RequireJS',
      default: false,
    // }, {
    //   type: 'confirm',
    //   name: 'sockets',
    //   message: 'Use Socket.IO',
    //   default: false,
    // }, {
    //   type: 'confirm',
    //   name: 'socketwrap',
    //   message: 'Use Socket.IO wrapping',
    //   default: false,
    // }, {
    //   type: 'confirm',
    //   name: 'ssl',
    //   message: 'Use SSL/TLS',
    //   default: false,
    // }, {
    //   type: 'list',
    //   choices: ['caterpillar', 'winston', 'none'],
    //   name: 'logging',
    //   message: 'Logging engine',
    //   default: 'caterpillar',
    // }, {
    //   type: 'list',
    //   choices: ['konphyg', 'nconf', 'none'],
    //   name: 'config',
    //   message: 'Configuration handler',
    //   default: 'konphyg'
    }];

    this.prompt(prompts, function (props) {
      this.newdir = props.newdir;
      this.noob = props.noob;

      this.name = props.name;
      this.author = props.author;
      this.description = props.description;

      this.server_view = props.server_view;
      this.css = props.css;

      this.requirejs = props.requirejs;

      cb();
    }.bind(this));
  }.bind(this));
};

// Extend Yeoman generator functions.
OrbitGenerator.prototype.extend = function extend(){
  if(this.newdir){
    this.name = this.name || 'orbit-app';
    this.mkdir(this.name);
    process.chdir(this.name);
  }

  var old_template = this.template.bind(this)
    , old_copy = this.copy.bind(this);

  this.template = function(infile, outfile){
    if(outfile === undefined){
      return old_template(infile, path.dirname(infile) + path.sep + path.basename(infile).substr(1));
    }
    return old_template(infile, outfile);
  };

  this.copy = function(infile, outfile){
    if(outfile === undefined){
      return old_copy(infile, infile);
    }
    return old_copy(infile, outfile);
  };
};

// Copy application files.
OrbitGenerator.prototype.app = function() {
  this.template('_Gruntfile.js');

  this.template('_app.js');
  this.copy('server.js');

  this.copy(path.join('bin', 'orbit.js'));

  this.copy(path.join('controllers', 'index.js'));

  if (this.noob) {
    this.copy(path.join('lib', 'auth.js'));
    this.copy(path.join('lib', 'sockets.js'));
  } else {
    this.mkdir('lib');
  }

  this.template(path.join('models', '_index.js'));

  this.mkdir(path.join('public', 'components'));
  this.mkdir(path.join('public', 'images'));
  this.copy(path.join('public', 'js', '.jshintignore'));
  this.copy(path.join('public', 'js', '.jshintrc'));

  if(this.requirejs){
    this.copy(path.join('public', 'js', 'app.js'));
    this.copy(path.join('public', 'js', 'config.js'));
  }

  this.template(path.join('test', '_index.js'));
};

// Copy stylesheets.
OrbitGenerator.prototype.css = function() {
  this.copy(path.join('public', 'css', 'app.' + this.css.substr(0, 4)));
};

// Copy views.
OrbitGenerator.prototype.views = function() {
  this.copy(path.join('public', 'templates', 'index.blade'));
  this.copy(path.join('public', 'templates', 'layouts', 'master.blade'));

  this.copy(path.join('views', 'index.blade'));
  this.copy(path.join('views', 'layouts', 'master.blade'));
  this.copy(path.join('views', 'errors', '404.blade'));
  this.copy(path.join('views', 'errors', '500.blade'));
};

// Copy project files.
OrbitGenerator.prototype.project_files = function() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('nodemonignore', '.nodemonignore');
  this.copy('travis.yml', '.travis.yml');

  this.copy('Procfile');

  this.template('_bower.json');
  this.template('_package.json');

  this.copy('LICENSE');
  this.copy('README.md');
};
