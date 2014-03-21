if (Meteor.isServer) {
	var fs = Npm.require('fs');
	var path = Npm.require('path');
   
	Meteor.methods({
    save: function (arg) {
    	
    },
    
    export: function (story_id) {
		
    	Scene = function(id, image){
			this.scene_id=id;
			this.image = image;
			this.actions = []
		};
		Action = function(id, tts, face, motion){
			this.action_id = id;
			this.tts = tts;
			this.face = face;
			this.motion = motion;
		};
	   console.log("get the Story id: "+ story_id);
	   var master_ip = '';
	   var story_name = '';
	   var execution_path = '';
	   var scenes = '';
	   
	   var story = Stories.findOne(story_id);
	   master_ip = story.master_ip;
	   story_name = story.story_name;
	   execution_path = story.execution_path;
	   scenes = db2scenes(story);
	   
	   var li_tags = "";
	   for (var k  = 0; k < scenes .length ; k ++){
		   var li_tag_tmpl = "<li><img src='%(IMAGE_SRC_PATH)'/></li>"
		   li_tags += li_tag_tmpl.replace("%(IMAGE_SRC_PATH)", scenes[k].image);
	   }
	   var data = fs.readFileSync('../client/app/export/example/template.html', 'utf8');
	   var html = data.replace("%(SCENE_INFO)",JSON.stringify(scenes))
	   			.replace("%(STORY_NAME)",story_name)
	   			.replace("%(MASTER_IP)",master_ip)
			   .replace("%(IMAGES_SRC_PATH)",li_tags);
	   
	   function db2scenes(story){
		   if(story){
			 //access the scene info
			   var scenes = [];
			   var scenes_cs = Scenes.find({story_name:story.story_name});
				scenes_cs.forEach(function(scene){
					console.log("add scene");
					scenes[scene.scene_id] = new Scene(scene.scene_id,scene.image);
					var actions_cs = Actions.find({story_name:story.story_name, scene_id:scene.scene_id});
					actions_cs.forEach(function(action){
						scenes[scene.scene_id].actions[action.action_id] = new Action(action.action_id, action.tts, action.face, action.motion);
					});
				});
				return scenes;
		   }
		   else{
			   return undefined;
		   }
	   };
	   //save the file
      var buffer = new Buffer(html);
      fs.writeFileSync("../client/app/export/example/"+execution_path, buffer);
      //fs.writeFileSync("../../../../../public/export/example/"+execution_path, buffer);
	   }
  });
}