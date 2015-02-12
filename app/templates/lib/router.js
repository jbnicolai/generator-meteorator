/**
 *	Setting an app wide layout template:
 *	appBody 
 *  implemented in app-body.html and 
 *  app-body.js
 */
Router.configure({
	layoutTemplate: 'appBody'
});

/**
 * 	Map URL's to routes
 */
Router.map(function(){
	
	// Start page
	this.route('/', function(){
		this.render('Home');
	});

	// Info page
	this.route('/info', function() {
		this.render('Info');
	});
});