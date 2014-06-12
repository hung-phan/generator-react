'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the component subgenerator with the argument ' + this.name + '.');
};

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype.askForModuleLoader = function askForModuleLoader() {
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
};

ComponentGenerator.prototype.askForJSFile = function askForJSFile() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'jsFile',
    message: 'What utils would you like to include?',
    choices: [{
      name: 'React Addons',
      value: 'includeReactAddons',
      checked: true
    }]
  }];

  this.prompt(prompts, function(props) {
    function includeJS(js) {
      return props.jsFile.indexOf(js) !== -1;
    }

    // JS
    this.includeReactAddons = includeJS('includeReactAddons');
    cb();
  }.bind(this));
};

ComponentGenerator.prototype.files = function files() {
  var relativePath = 'app/jsx/components/';
  this.template('component.js', relativePath + this.name + '.jsx');
  this.template('_component.tpl.js', relativePath + '_' + this.name + '.tpl.jsx');
};
