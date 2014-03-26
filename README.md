rocon_storytelling
==================

Software for our storytelling tool

### Meteor launch and MR api Test

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
I20140321-14:28:49.221(9)? make execution page: delivery.html
I20140321-14:28:49.221(9)? make execution page: cleaning.html
I20140321-14:28:49.221(9)? make execution page: patrol.html
```
Now, open the web browser(recommended chrome) and connect ``` http://localhost:3000/main ```

If you want test of motion retargeting api, need to rosbridge server.

```
roslaunch rosbridge_server rosbridge_websocket.launch --screen 

```

And then connect here. It is simple execution page.
```
http://localhost:3000/export/example/test_motion_player.html
```
push the start story, check the rostopic list. And then you can see the following topic list
```
/face
/rocon_robosem/motion_player/motion_playback
/rocon_robosem/motion_player/playback_status
/response
/rosout
/rosout_agg
/tts
```
If you want see the web debug message, push the ```F12``` and go to the console tab.

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

Go to the test page, write the tts text and push the play button, sta app speeches your text.
and the sta app display only image in image list.

 
