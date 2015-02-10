Meteor.startup(function(){
	
	if ( Pages.find().count() === 0 ) {
		var data = [
			{
				title: 'The Meteor Manual',
				desc: 'Learning reactive programming and templating',
				link: 'http://manual.meteor.com'
			},
			{
				title: 'Meteor Cookbook',
				desc: 'Community driven Learning Resource',
				link: 'http://meteorgitbook.harp.io/'
			},
			{
				title: 'Meteor on Stackoverflow',
				desc: 'Meteor related Q&A',
				link: 'http://stackoverflow.com/search?q=meteor'
			}
		];

		_.each(data, function(page){
			Pages.insert({
				title: page.title,
				desc: page.desc,
				link: page.link
			});
		});
	}
});