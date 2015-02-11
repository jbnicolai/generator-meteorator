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
Generator.prototype.prompting = function prompting() {
	var done = this.async(),
	prompts = [{
		type: 'confirm',
		name: 'LESS',
		message: 'Would you like using LESS?',
		default: true
	}, {
		type: 'confirm',
		name: 'Bootstrap',
		message: 'Shall we use Bootstrap?',
		default: false
	}, {
		type: 'confirm',
		name: 'IronRouter',
		message: 'Would you like to add the iron:router package?',
		default: false
	}];
	this.prompt(prompts, function (answers) {
		this.useLess = answers.LESS;
		this.useBootstrap = answers.Bootstrap;
		this.useIron = answers.IronRouter;
		done();
	}.bind(this));
};

/**
 *	Start scaffolding the app
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
	var style_suffix = (this.useLess) ? '.less' : '.css';
	this.copy('client/stylesheets/main'+style_suffix, 'client/stylesheets/main'+style_suffix);
	this.copy('lib/collections.js', 'lib/collections.js');
	this.copy('public/robots.txt', 'public/robots.txt');
	this.copy('server/bootstrap.js', 'server/bootstrap.js');

};

/**
 *	Adding choosen packages
 */
 Generator.prototype.pkgAdd = function pkgAdd() {
 	if ( this.useBootstrap ) {
 		pkgs.push('bootstrap');
 		pkgs.push('jquery');
 		pkgs.push('less');
 	}
 	if ( this.useLess && pkgs.indexOf('less') == -1 ) {
 		pkgs.push('less');
 	}
 	if ( this.useIron ) {
 		pkgs.push('iron:router');
 	}
 };

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