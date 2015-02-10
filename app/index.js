/**
 *	The very basic generator
 */
'use strict';

var util = require('util'),
	path = require('path'),
	chalk = require('chalk'),
	yosay = require('yosay'),
	yeoman = require('yeoman-generator'),
	pkgs = [
		'meteor-platform',
		'autopublish',
		'insecure'
	],

Generator = module.exports = function Generator(args, opts) {

    yeoman.generators.Base.apply(this, arguments);
    
    this.argument('appname', {type: String, required: false});
	this.appname = this.appname || path.basename(process.cwd());
	this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));

};

util.inherits(Generator, yeoman.generators.Base);


/**
 *	Saying hello to the world
 */

Generator.prototype.welcome = function welcome() {
    this.log(
        yosay(
            chalk.green('Welcome to the awesome ')+
            chalk.blue.bold('METEORATOR\n')+
            chalk.white('Scaffolding for your Meteor projects.')
        )
    );
};

/**
 *	Ask for a couple of things
 */
/*Generator.prototype.prompting = function prompting() {
	var done = this.async(),
	prompts = [{
		type: 'confirm',
		name: 'coffee',
		message: 'Do you like to code in CoffeeScript?',
		default: false				
	},
	{
		type: 'confirm',
		name: 'jquery',
		message: 'Shall we bundle jQuery with your project?',
		default: true
	},
	{
		type: 'confirm',
		name: 'bootstrap',
		message: 'And what about Bootstrap with LESS?',
		default: false
	},{
		type: 'confirm',
		name: 'less',
		message: 'LESS only?',
		default: true
	}];
	this.prompt(prompts, function (answers) {
		this.coffee = answers.coffee;
		this.jquery = answers.jquery;
		this.bootstrap = answers.bootstrap;
		this.less = answers.less;
		done();
	}.bind(this));
};*/

/**
 *	Start scaffolding
 */
Generator.prototype.writing = function writing() {
	
	//
	// Create the directory structure
	//

	this.mkdir('.meteor');
	this.mkdir('client');
	this.mkdir('client/stylesheets');
	this.mkdir('client/templates');
	this.mkdir('lib');
	this.mkdir('public');
	this.mkdir('public/images');
	this.mkdir('public/fonts');
	this.mkdir('public/icons');
	this.mkdir('server');

	//
	// Copy the template files in their respective directories 
	//

	this.copy('.meteor/.gitignore', '.meteor/.gitignore');
	this.copy('.meteor/release', '.meteor/release');
	this.copy('client/head.html', 'client/head.html');
	this.copy('client/templates/main.js', 'client/templates/main.js');
	this.copy('client/templates/main.html', 'client/templates/main.html');
	//var style_suffix = (this.less) ? '.less' : '.css';
	//this.copy('client/stylesheets/main'+style_suffix, 'client/stylesheets/main'+style_suffix);
	this.copy('client/stylesheets/main.css', 'client/stylesheets/main.css');
	this.copy('lib/collections.js', 'lib/collections.js');
	this.copy('public/robots.txt', 'public/robots.txt');
	this.copy('server/bootstrap.js', 'server/bootstrap.js');

};

/**
 *	Adding choosen packages
 */
 /*Generator.prototype.pkgAdd = function pkgAdd() {
 	if ( this.coffee ) {
 		pkgs.push('coffeescript');
 	}
 	if ( this.jquery ) {
 		pkgs.push('jquery');
 	}
 	if ( this.bootstrap ) {
 		pkgs.push('bootstrap');
 		pkgs.push('less');
 	}
 	if ( this.less && pkgs.indexOf('less') == -1 ) {
 		pkgs.push('less');
 	}
 };*/

/**
 *	Writing packages to file, clean up and bye
 */
Generator.prototype.done = function done() {
	this.write('.meteor/packages', pkgs.join('\n'));
};


Generator.prototype.end = function end() {
	this.log('\nYeehaw! All went well!\n\nStart your Meteor app on the command line with:\n'+
		chalk.green('meteor')+'\n\n');
};