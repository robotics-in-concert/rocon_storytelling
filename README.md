rocon_storytelling
==================

Software for our storytelling tool




### For Check StoryTelling Authoring Tool with Robosem Simuluation

- launch the meteor
```
> cd <rocon_storytelling package>/storytelling_web
> meteor
```
- launch the [robosem storytelling simulation](https://github.com/robotics-in-concert/rocon_storytelling/blob/hydro-devel/README.md)

- run the rviz robosem simulation for checking the robot motion without real robot.
```
roslaunch robosem_meta view_robot.launch
```
- Now download and install the android app for showing face and doing tts. you can download the apk following url
```
http://files.yujinrobot.com/android/apks/sat_app_ver_2.0.apk
```
- launch the SATApp and connect the robot ip
- open the browser(recommended chrome) and connect here url
```
http://localhost:3000/main
```
- You select the 'prototype' and click the some scene. So, you can chage the motion, tts text, face.
- After the authoring scene, you select the 'Export' and 'Execution'.
- Start story, and the robot does tts, motion, expression of emotion.

### Meteor launch

First, install the meteor
```
> curl https://install.meteor.com/ | sh
```
And then, launch the story telling authoring server
```
> cd <rocon_storytelling package>/storytelling_web
> meteor
```
you can see follow message,

```
[[[[[ ~/rocon/src/rocon_storytelling_web/storytelling_web ]]]]]

=> Meteor 0.7.2 is available. Update this project with 'meteor update'.
=> Meteor server running on: http://localhost:3000/
I20140321-14:28:49.159(9)? make execution page: prototype.html

```

### Simple test with Motion Player 

First, launch the [robosem storytelling simulation](https://github.com/robotics-in-concert/rocon_storytelling/blob/hydro-devel/README.md)
and then, launch the meteor and connect following page. 

```
http://localhost:3000/export/example/test_simple_motion_player.html
```
Next, Copy and paste motion list and push the ```Play``` button.
Lastly, Check the log and open the debug console. (using ```F12```)

### Simple test with Android STA App

First, launch the [robosem storytelling simulation](https://github.com/robotics-in-concert/rocon_storytelling/blob/hydro-devel/README.md)
and then, launch the meteor and connect following page. 

```
http://localhost:3000/export/example/test_simple_motion_player.html
```

Next, download and insall the android app.

```
http://files.yujinrobot.com/android/apks/sat_app_ver_1.0.apk
```
launch the android app, and write your pc ip in the "Robot uri" box. ex) ```http://<your_pc_ip>:11311/```

you check the "cento" image and then, go to the test page, write the tts text and push the play button, sta app speeches your text.
Also, you can select the displayed image.but the sta app display only image in image list.


### Setting the robot motion

- launch the meteor
```
> cd <rocon_storytelling package>/storytelling_web
> meteor
```
- launch the [robosem storytelling simulation](https://github.com/robotics-in-concert/rocon_storytelling/blob/hydro-devel/README.md)
- connect bellow url

```
http://localhost:3000/setting
```
- Set the robot ip and the topic name and type about motion list and . 
- And push the "connect" and add the motion

