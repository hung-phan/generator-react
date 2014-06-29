'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');

var ReactGenerator = module.exports = function ReactGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ReactGenerator, yeoman.generators.Base);

ReactGenerator.prototype.askForCSSFramework = function askForCSSFramework() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'list',
    name: 'cssFramework',
    message: 'What CSS framework would you like to include?',
    choices: [{
      name: 'SASS Bootstrap',
      value: 'SASSBootstrap'
    }, {
      name: 'SASS Compass framework',
      value: 'CompassFramework'
    }]
  }];

  this.prompt(prompts, function(props) {
    this.cssFramework = props.cssFramework;
    cb();
  }.bind(this));
};

ReactGenerator.prototype.askForModuleLoader = function askForModuleLoader() {
  var cb = this.async();

  var prompts = [{
    type: 'list',
    name: 'moduleLoader',
    message: 'What module loader would you like to include?',
    choices: [{
      name: 'Browserify',
      value: 'browserify'
    }, {
      name: 'Requirejs',
      value: 'requirejs'
    }]
  }];

  this.prompt(prompts, function(props) {
    this.moduleLoader = props.moduleLoader;
    cb();
  }.bind(this));
}

ReactGenerator.prototype.askForCSSFile = function askForCSSFile() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'cssFile',
    message: 'What css library would you like to include?',
    choices: [{
      name: 'SASS Button by Alexwolfe',
      value: 'includeButtonCss',
      checked: false
    }, {
      name: 'Animate SCSS',
      value: 'includeAnimateCss',
      checked: false
    }, {
      name: 'Bootstrap font-awesome',
      value: 'includeFontAwesome',
      checked: true
    }]
  }];

  this.prompt(prompts, function(props) {
    function includeCSS(css) {
      return props.cssFile.indexOf(css) !== -1;
    }

    // CSS
    this.includeButtonCss = includeCSS('includeButtonCss');
    this.includeAnimateCss = includeCSS('includeAnimateCss');
    this.includeFontAwesome = includeCSS('includeFontAwesome');

    cb();
  }.bind(this));
};

ReactGenerator.prototype.askForJSFile = function askForJSFile() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'jsFile',
    message: 'What utils would you like to include?',
    choices: [{
      name: 'lodash.js',
      value: 'includeLodash',
      checked: false
    }, {
      name: 'React Addons',
      value: 'includeReactAddons',
      checked: true
    }, {
      name: 'Fluxxor',
      value: 'includeFluxxor',
      checked: false
    }, {
      name: 'Jasmine Testing framework',
      value: 'includeJasmine',
      checked: true
    }, {
      name: 'Modernizr',
      value: 'includeModernizr',
      checked: true
    }]
  }];

  this.prompt(prompts, function(props) {
    function includeJS(js) {
      return props.jsFile.indexOf(js) !== -1;
    }

    // JS
    this.includeLodash = includeJS('includeLodash');
    this.includeJasmine = includeJS('includeJasmine');
    this.includeModernizr = includeJS('includeModernizr');
    this.includeReactAddons = includeJS('includeReactAddons');
    this.includeFluxxor = includeJS('includeFluxxor');

    if (this.includeJasmine) {
      this.testFramework = 'jasmine';
    }

    cb();
  }.bind(this));
};

ReactGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

ReactGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

ReactGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

ReactGenerator.prototype.jshint = function jshint() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

ReactGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
  this.template('index.html', 'app/index.html');
};

ReactGenerator.prototype.mainStylesheet = function mainStylesheet() {
  var cssFile = 'style.scss',
    header = '',
    content = this.readFileAsString(path.join(this.sourceRoot(), 'main.scss'));

  if (this.cssFramework === 'SASSBootstrap') {
    content += this.readFileAsString(path.join(this.sourceRoot(), 'bootstrap.css'));
  }
  if (this.includeFontAwesome) {
    header += "$fa-font-path: '../bower_components/font-awesome/fonts';\n" +
              "@import '../bower_components/font-awesome/scss/font-awesome';\n";
  }
  if (this.includeButtonCss) {
    header += "@import '../bower_components/Buttons/scss/buttons';\n"
  }
  if (this.includeAnimateCss) {
    header += "@import '../bower_components/animate-sass/animate';\n"
  }

  switch (this.cssFramework) {
    case 'CompassFramework':
      header += "@import 'compass';\n" +
        "@import 'compass/reset';\n";
      break;
    case 'SASSBootstrap':
      header += "$icon-font-path: '../bower_components/sass-bootstrap/fonts/';\n" +
        "@import '../bower_components/sass-bootstrap/lib/bootstrap';\n";
      break;
  }
  header += "@import 'custom_mixins.scss';\n";
  this.copy('_custom_mixins.scss', 'app/styles/_custom_mixins.scss');
  this.write('app/styles/' + cssFile, header + content);
};

ReactGenerator.prototype.jsFile = function jsFile() {
  if (this.moduleLoader === 'requirejs') { this.template('jsx/config.jsx', 'app/jsx/config.jsx'); }
  this.template('jsx/main.jsx', 'app/jsx/main.jsx');
  this.template('jsx/app.jsx', 'app/jsx/app/app.jsx');
  this.copy('jsx/_app.tpl.jsx', 'app/jsx/app/_app.tpl.jsx');
};

ReactGenerator.prototype.app = function app() {
  this.mkdir('app/images');
  if (this.moduleLoader === 'requirejs') {
    this.mkdir('app/scripts/vendor');
  } else {
    this.template('browserify.config.js', 'browserify.config.js');
  }
  this.mkdir('config');
  this.mkdir('test');
};

ReactGenerator.prototype.install = function install() {
  if (this.options['skip-install']) { return; }

  var done = this.async(), self = this;
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: function() {
      var projectDir = process.cwd() + '/app';
      if (self.moduleLoader === 'requirejs') {
        fs.exists(projectDir + '/scripts/vendor/require.js', function(exists) {
          if (!exists) {
            fs.createReadStream(projectDir + '/bower_components/requirejs/require.js')
              .pipe(fs.createWriteStream(projectDir + '/scripts/vendor/require.js'));
          }
        });
      }
      if (self.includeModernizr) {
        //copy modernizr
        self.mkdir('app/scripts/vendor');
        fs.exists(projectDir + '/scripts/vendor/modernizr.js', function(exists) {
          if (!exists) {
            fs.createReadStream(projectDir + '/bower_components/modernizr/modernizr.js')
            .pipe(fs.createWriteStream(projectDir + '/scripts/vendor/modernizr.js'));
          }
        });
      }
    }
  });
};
