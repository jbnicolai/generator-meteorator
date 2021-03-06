# Meteorator

This generator can be used as a complete replacement for the built-in generator of the Meteor framework. It generates a complete scaffold for a ready-to-use Meteor app.

## Prerequisites

Meteor runs on Linux or Mac OS, Windows is not fully supported yet.

To use the generator you must have the following software installed on your machine:

* Node.js
* npm
* Yeoman
* Meteor
* generator-meteorator

## Install the generator

There are two ways to get the generator installed:

### via npm

Open a terminal and type:

	npm install generator-meteorator -g

### via GitHub

Open a terminal and type:

	git clone https://github.com/StSchrader/generator-meteorator.git
	cd generator-meteorator
	npm link


## Getting started

To get up and running, open a terminal an type the following:

    mkdir yourprojectname
    cd yourprojectname
    yo meteorator

Meteorator will now create all needed files and directories for you. When all went well, the generator ends up with a message of success.

Now you simply have to type:

	meteor

to start.