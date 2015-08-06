/**
 * 
 */
Robots = new Meteor.Collection("robots");
if (Meteor.isClient) {
    var ros = new ROSLIB.Ros();
    var new_motions = [];
    settingROSCallbacks();
    
    function settingROSCallbacks(){
       ros.on('connection',function(){
            console.log("ROS Connected");
            $('.sat-connect-robot').attr("disabled", "disabled");
            var topic_name = $('.sat-motion-list-topic').val();
            var topic_type = $('.sat-motion-list-topic-type').val();
            console.log("connected topic_name: ", topic_name);
            console.log("connected topic_type: ", topic_type);
            set_sub(topic_name, topic_type);
        });
        ros.on('error',function(e) {
          console.log("ROS Error!",e);
        });
        ros.on('close',function() {
          console.log("ROS onnection Close!");
        });
    }
    
    function set_sub(topic_name, topic_type){
        /*subscriber*/
        response_listener = new ROSLIB.Topic({
              ros : ros,
                name : topic_name,
                messageType: topic_type
                });    
          response_listener.subscribe(function(msg) {
              console.log(msg);
              //new_motions = msg.motions;
              Session.set('new_motion',msg.motions);
         });
    }
    
    
    Template.setting_page.new_motions =  function () {
        return Session.get('new_motion');
    };
    
    Template.setting_page.robots =  function () {
        return Robots.find({});
    };
    Template.setting_page.motions =  function () {
        var robotcs = Robots.find({robot_name:Session.get("selected_robot")});
        var motion_list;
        robotcs.forEach(function(arg){
            motion_list = arg.motion_list;
        });
        return motion_list;
    };
    
    Template.setting_page.rendered = function(){
        console.log("rendering!!!!");
    };
    
    Template.setting_page.events({
        'click .sat-robot-list': function (event, template) {
            var selected_robot = template.find("."+"sat-robot-list").value;
            //Session.set("selected_robot",selected_robot);
            Session.set("selected_robot","robosem");
        },
        'click .sat-connect-robot': function (event, template) {
            var robot_ip = template.find(".sat-robot-ip").value;
            ros.connect("ws://"+robot_ip);
        },
        'click .sat-substraction-motion': function (event, template) {
            var robot = Robots.findOne({robot_name:'robosem'});
            robot.motion_list.splice(robot.motion_list.indexOf(this),1);
            Robots.update(robot._id,{$set: {motion_list: robot.motion_list}});
        },
        'click .sat-add-motion': function (event, template) {
            var robot = Robots.findOne({robot_name:'robosem'});
            console.log(this);
            if(robot.motion_list.indexOf()== -1){
                robot.motion_list.push(this);
                Robots.update(robot._id,{$set: {motion_list: robot.motion_list}});
            }
        },
        
    });
}

if(Meteor.isServer){
    if (Robots.find().count() === 0){
        Robots.insert({
            robot_name:'robosem',
            motion_list:[{motion_name:'HELLO'},{motion_name:'NO'},{motion_name:'YES'},{motion_name:'NOD'}],
            });
    }
};