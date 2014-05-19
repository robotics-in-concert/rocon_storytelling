#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
import motion_retargeting_msgs
from .motion import motion_dict

class MotionPlayer(object):

    def __init__(self):
        self.motion_dict = motion_dict

        self._init_ros_apis()

    def _init_ros_apis():
        self.pub = {}
        self.pub['list_motion'] = rospy.Publisher('list_motion', P
        self.sub = {}
