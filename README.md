rocon_storytelling
==================

Software for our storytelling tool


# Storytelling for Robosem

## Setup

- Install Robosem software packages
- Install ROCON app platform using the rosinstaller https://raw.githubusercontent.com/robotics-in-concert/rocon/hydro-devel/rocon_app_platform.rosinstall
- Install motion retargeting packages (including the motion player): https://github.com/pal-robotics/reem_teleop (hydro-devel branch)
- Install this repo and checkout the hydro-devel branch

## Storytelling app

- Launch Robosem control software with the app manager:

For simulation

```
$ export ROBOT_SIMULATION=true
$ roslaunch robosem_meta rapp_platform.launch
```

On the real robot

```
$ roslaunch robosem_meta rapp_platform.launch
```

- Start the robot app (motion player + rosbridge)

Use the new GUI

```
$ rocon_qt_app_manager 
```

Or via command line

```
$ rosservice call /rocon_robosem/start_rapp "name: 'robosem_storytelling/robosem_storytelling'"
```

- Activate motors (real robot only)

```
$ rostopic pub /rocon_robosem/enable std_msgs/String "data: 'all'"
```

- Start the web app
