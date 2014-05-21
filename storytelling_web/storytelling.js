Stories = new Meteor.Collection("stories");
Scenes = new Meteor.Collection("scenes");
Actions = new Meteor.Collection("actions");
Emotions = new Meteor.Collection("emotions");

var Router = Backbone.Router.extend({
	  routes: {
	    "main":                 "main", //this will be http://your_domain/main
	    "test":             "test",  // http://your_domain/test
	    "setting":             "setting",  // http://your_domain/setting
	  },
	  main: function() {
		  Session.set('currentPage', 'main_page'); 
	  },
	  setting: function() {
		  Session.set('currentPage', 'setting_page');
	  },
	  test: function() {
		  Session.set('currentPage', 'test_page');
	  }
	  
	});
var app = new Router; 
//slide show page
// Can also be used with $(document).ready()
 
if (Meteor.isClient) {
	 Meteor.startup(function () {
		Backbone.history.start({pushState: true}); 
		var selected = Session.get("selected_story");
		console.log("start up: "+selected);
		Session.set("isShowSetSceneDialog", false); 
	});
	
	Template.main_page.selected = function(){
		 var story = Stories.findOne(Session.get("selected_story"));
	    return story && story.story_name;
	};
	
	Template.main_page.isShowSetSceneDialog = function () {
		  return Session.get("isShowSetSceneDialog");
	};
	
	Template.storyboard.events({
		    'click .story': function () {
		      Session.set("selected_story", this._id);
		    }
	});

	Template.storyboard.stories =  function () {
		return Stories.find({}, {sort: {story_name: 1}});
	};

	Template.settingborad.story_name =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		return story.story_name;
	};
	
	Template.settingborad.master_ip =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		return story.master_ip;
	};
	
	Template.settingborad.robot_type =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		return story.robot_type;
	};
	 
	Template.settingborad.events({
		'click button.sat-save-setting': function(event,tmpl){
			if(event.type === "click"){
				//var new_story_name = tmpl.find("input.sat-story_name").value;
				var new_robot_type = tmpl.find("input.sat-robot_type").value;
				var new_master_ip = tmpl.find("input.sat-master_ip").value;
			
				var story = Stories.findOne(Session.get("selected_story"));
				//action update
				//var action_cs = Actions.find({story_name:story.story_name});
				//action_cs.forEach(function(arg){
				//	Actions.update(arg._id, {$set: {story_name: new_story_name}});
				//});
				//scene update
				//var scenes_cs = Scenes.find({story_name:story.story_name});
				//scenes_cs.forEach(function(arg){
				//	Scenes.update(arg._id, {$set: {story_name: new_story_name}});
				//});
				//story update
				Stories.update(story._id, {$set: {robot_type: new_robot_type}});
				Stories.update(story._id, {$set: {master_ip: new_master_ip}});
				//Stories.update(story._id, {$set: {story_name: new_story_name}});
			}
		},
	});
	

	////////////////////////////////////////////////////////////////////////////////////////////////////////	
	Template.sceneboard.scenes =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		return Scenes.find({story_name:story.story_name}, {sort: {scene_id: 1}});
	};
	
	Template.sceneboard.events({
		'click .scene_image': function () {
			console.log("selected_scene: "+ this._id);
			Session.set("selected_scene", this._id);
			var selected_scene = Scenes.findOne(Session.get("selected_scene"));
			var _story_name = selected_scene.story_name;
			var _scene_id = selected_scene.scene_id;

			console.log("story name: "+ _story_name);
			console.log("scene id: "+ _scene_id);

			Session.set("isShowSetSceneDialog", true);
		},
	
	});

	
	////////////////////////////////////////////////////////////////////////////////////////////////////////	
	Template.launchboard.master_ip =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.master_ip;
		}
		else{
			return undefined;
		}
		
	};
	
	Template.launchboard.story_name =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.story_name;
		}
		else{
			return undefined;
		}
		
	};
	
	Template.launchboard.robot_type =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.robot_type;
		}
		else{
			return undefined;
		}
		
	};
	
	
	
	Template.launchboard.exec_path =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.execution_path;
		}
		else{
			return undefined;
		}
	};
	
	Template.launchboard.events({
		'click .sat-export' : function(){
			var story_id = Session.get("selected_story");
			Meteor.call("export",story_id,function (err) {
	            if (err) 
	              throw err;
	            else
	            	console.log("export complete");
	            	alert("export complete"); // change the alert to rotation ui
	        });
		},
		'click .sat-execution' : function(){
			console.log("click .sat-execution");
			story = Stories.findOne(Session.get("selected_story"));
			var server_ip = location.href.split('/main')[0];
			window.open(server_ip+"/export/example/"+story.execution_path);
		},
  });
	

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	Template.SceneSettingDialog.image = function(){
		var scene = Scenes.findOne(Session.get("selected_scene"));
		return scene && scene.image;
	};
	
	Template.SceneSettingDialog.actions = function(){
		console.log("show actions");
		var selected_scene = Scenes.findOne(Session.get("selected_scene"));
		if(selected_scene){
			var _story_name = selected_scene.story_name;
			var _scene_id = selected_scene.scene_id;
			
			return Actions.find({story_name:_story_name,scene_id:_scene_id}, {sort :{action_id:1}});
		}
		else{
			return undefined;
		}
	};
	
	Template.SceneSettingDialog.motions =  function () {
		story = Stories.findOne(Session.get("selected_story"));
		var robotcs = Robots.find({robot_name:story.robot_type});
		var motion_list;
		robotcs.forEach(function(arg){
			motion_list = arg.motion_list;
			console.log(motion_list);
		});
		console.log(motion_list);
		return motion_list;
	};
	
	Template.SceneSettingDialog.emotions = function(){
		console.log("show emotions");
		return Emotions.find({}, {sort :{action_id:1}});
	};
	
	
	Template.SceneSettingDialog.rendered = function(){
		$(function () {
		    $('#action_tabs a:last').tab('show');
		});
	};
	
	Template.SceneSettingDialog.events({
		'click .add': function (event, template) {
			
			var selected_scene = Scenes.findOne(Session.get("selected_scene"));
			var _story_name = selected_scene.story_name;
			var _scene_id = selected_scene.scene_id;
			var _action_id = Actions.find({story_name:_story_name,scene_id:_scene_id},{}).count();
			
			var option = {story_name: _story_name,
							scene_id: _scene_id,
							action_id: _action_id,
							motion: _story_name+"_"+_scene_id+"_"+_action_id,
							face: _story_name+"_"+_scene_id+"_"+_action_id,
							tts: _story_name+"_"+_scene_id+"_"+_action_id,};
			var id = Random.id();
			
			Actions.insert({
				story_name: option.story_name,
				scene_id: option.scene_id,
				action_id: option.action_id,
				motion: option.motion,
				face: option.face,
				tts: option.tts, 
			    });
		
		},
		
		'click .ok': function (event, template) {
			var selected_scene = Scenes.findOne(Session.get("selected_scene"));
			var _story_name = selected_scene.story_name;
			var _scene_id = selected_scene.scene_id;
			
			var action_cs = Actions.find({story_name:_story_name,scene_id:_scene_id}, {sort :{action_id:1}});
			action_cs.forEach(function(action){
				
				console.log(_motion);
				
				var _motion = template.find("."+action._id+"_motion").value;
				var _face = template.find("."+action._id+"_face").value;
				var _tts = template.find("."+action._id+"_tts").value;
				
				console.log(_motion);
				console.log(_face);
				console.log(_tts);
				
				Actions.update(action._id, {$set: {motion: _motion}});
				Actions.update(action._id, {$set: {face: _face}});
				Actions.update(action._id, {$set: {tts: _tts}});
			});
			Session.set("isShowSetSceneDialog", false);
		},

		'click .cancel': function () {
			Session.set("isShowSetSceneDialog", false);
		},
		
		'click .delete': function () {
			console.log("delete");
			console.log(this._id);
			Actions.remove(this._id);
			$(function () {
			    $('#action_tabs a:last').tab('show');
			});
		}, 
	});
	
	//index paging///////////////////
	Template.index_page.is_main= function () {
		var value = Session.get("currentPage") === "main_page" ? true : false;
		return value;
	};
	
	Template.index_page.is_test= function () {
		var value = (Session.get("currentPage") === "test_page" ? true : false);
		return value;
	}; 
	Template.index_page.is_setting= function () {
		var value = (Session.get("currentPage") === "setting_page" ? true : false);
		return value;
	}; 
}

if (Meteor.isServer) {
	Meteor.startup(function () {	 
		// code to run on server at startup
		var fs = Npm.require('fs');
		var names = ["prototype","toyweb"];
		var emotions = ['angry','default','disappoint','fear','happy','sad','shame','surprise','think','wink' ];
		
		for( var i = 0 ; i< names.length ; i++){
			console.log("make execution page: " + names[i]+".html");
			fs.writeFileSync("../../../../../public/export/example/"+names[i]+".html", "");
		}
		
		if (Emotions.find().count() === 0){
			for( var i = 0 ; i< emotions.length ; i++){
				Emotions.insert({
					name: emotions[i]
				});
			}
		}
			
		if (Stories.find().count() === 0){
			for( var i = 0 ; i< names.length ; i++){
				Stories.insert({
					story_name: names[i] ,
					scene_image: "images/rocon.png",
					execution_path: names[i]+".html",
					master_ip: "localhost:9090",
					robot_type: "robosem",
					});
				
				for(var k = 0; k <4 ; k++){
					Scenes.insert({
						story_name: names[i],
						scene_id: k,
						image: "images/"+names[i]+"_scene_"+k+".jpg"
						});
				}
			}
		};
	});
}

