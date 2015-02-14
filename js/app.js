App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

var companyNick = 'simpleEduPage';
var access_token = '325878357576914|5gTkpsIKcCXmzMeVM4MWrWTbNlg';
var validTypes = ['status','photo'];

App.IndexRoute = Ember.Route.extend({
	
	model: function() {
    return $.ajax('https://graph.facebook.com//v2.2/'+companyNick+'/feed?access_token='+access_token)
  }
});

App.IndexController = Ember.Controller.extend({
	posts: function(){
		var result = [];
		var rawData = this.get('model.data');
		result = rawData.filter(function(value){
			return Ember.$.inArray(value.type, validTypes)>-1;
		}).map(function(post){
			console.log(post);
			var result = {};
			result.id = post.id;
			result.message = post.message;
			result.photo =  post.picture || '';
			console.log('result',result.photo);
			return result;
		});
		return result;
	}.property('model')
});