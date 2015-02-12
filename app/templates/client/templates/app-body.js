
Template.appBody.helpers({
	thisArray: function () {
		return [this];
	}
});

Template.appBody.events({
	'click #nav a': function (event) {
		$('#nav li').removeClass('active');
		$(event.target).parent().addClass('active');
	}
});