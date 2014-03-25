Robots = new Meteor.Collection("robots");

if (Meteor.isClient) {
	Template.test_page.master_ip =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.master_ip;
		}
		else{
			return undefined;
		}
		
	};
	
	Template.test_page.exec_path =  function () {
		var story = Stories.findOne(Session.get("selected_story"));
		if (story){
			return story.execution_path;
		}
		else{
			return undefined;
		}
	};
	
	Template.test_page.robots =  function () {
		var robots = Robots.find();
		return robots;
	};
	 
	Template.test_page.events({
		'click .export' : function(){
			var story_id = Session.get("selected_story");
			Meteor.call("export",story_id,function (err) {
	            if (err) 
	              throw err;
	            else
	            	console.log("export complete");
	            	alert("export complete"); // change the alert to rotation ui
	        });
		},
		'click .sta-get' : function(){
			console.log('get robot list');
			var motion_list_pub_topic = "/motion_list";
			var motion_list_pub_type = "std_msgs/Int32MultiArray";
		},
     });
	
}

if(Meteor.isServer){
	
	Robots.remove({});
	if (Robots.find().count() === 0){
		Robots.insert({
			robot_name:'robosem',
			motion_list:[1,2,3,4,],});
		Robots.insert({
			robot_name:'kobuki',
			motion_list:'2',})
	}
};