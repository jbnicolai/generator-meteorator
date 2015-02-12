Template.Home.helpers({
	data: function () {
		return Pages.find().fetch();
	}
});
