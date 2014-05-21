rocon_storytelling
==================

Software for our storytelling tool

### For Check StoryTelling Authoring Tool with Turtlebot for ToyWeb

#### launch the turtlebot (grieg) for storytelling.

In turtlebot, open the terminal

```
> cd /home/yujin/demos/demo_201405
> . .bashrc
> roslaunch turtlebot_bringup minimal_with_appmanager.launch --screen
```

open the new terminal 

```
> cd /home/yujin/demos/demo_201405
> . .bashrc
> rosservice call /turtlebot/start_rapp "name: 'turtlebot_motion/storytelling'"
```

And then you check following message
```
[INFO] [WallTime: 1400635392.129915] Rosbridge WebSocket server started on port 9090
[INFO] [WallTime: 1400635392.792956] Rosapi started

```

launch storytelling authoring tool web server.

Install the meteor.

```
> curl https://install.meteor.com/ | sh
```
 
Download amd setting the storytelling web agency for toyweb
 
```
> git clone https://github.com/robotics-in-concert/rocon_storytelling.git
> cd rocon_storytelling
> git checkout toyweb_web_agency
> cd storytelling_web
> meteor
```
 
Open the chrome browser, and connect following URL
 
```
http://localhost:3000/main
 
```
 
####  Getting Motion List

If you use storytelling tool first time, you must obtain the robot motion.
For getting the motions, connect following URL

```
http://localhost:3000/setting
```
And then, set the "Topic" and "ROBOT IP"
The "Topic" is "/turtlebot/list_motion". and ROBOT IP is "<robot ip>:9090".
Click the Connect button after setting the topic and robot ip, you can the available motion. 

Select the robot type to turtlebot and add the new motion.

####  Authoring Story 

After getting motion, connect following URL for authoring story. 
```
http://localhost:3000/main
```

1. Select the "toyweb" in Story List for modification toyweb story.

2. Set the Master IP and Robot Type following, and click the save

```
Master IP: <robot ip>:9090
Robot Type: turtlebot
```

you check the changed Launch Info.

3. Click the image, add the action and authorning the motion, face, TTS.

4. Click the Export and Execution.

5. Refresh the Execution page because the saved cache.

####  Launch Android App

Download and insall the android app.
```
http://files.yujinrobot.com/android/apks/sat_app_ver_1.0.apk
```
launch the android app, and write your pc ip in the "Robot uri" box. ex) http://<your_pc_ip>:11311/

####  Launch Story

Hit the start story after thr launching android app.
