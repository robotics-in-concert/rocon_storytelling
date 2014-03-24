rocon_storytelling
==================

Software for our storytelling tool


# Storytelling for Robosem

## Setup

- Install Robosem software packages
- Install ROCON app platform using the rosinstaller https://raw.githubusercontent.com/robotics-in-concert/rocon/hydro-devel/rocon_app_platform.rosinstall
- Install motion retargeting packages (including the motion player): https://github.com/pal-robotics/reem_teleop (motion_player branch)
- Install this repo and checkout the hydro-devel branch

## Storytelling app

- Launch Robosem control software with the app manager:

For simulation

```
$ roslaunch robosem_meta minimal_with_app_manager_storytelling_sim.launch
```

On the real robot

```
$ roslaunch robosem_meta minimal_with_app_manager_storytelling.launch
```

- Start the robot app (motion player + rosbridge)

```
$ rosservice call /rocon_robosem/start_app "name: 'robosem_storytelling/robosem_storytelling'"
```

- Start the web app

