#!/usr/bin/env python
#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

##############################################################################
# Imports
##############################################################################

import rospy
import turtlebot_motion

##############################################################################
# Launch point
##############################################################################

if __name__ == '__main__':
    rospy.init_node('turtlebot_motion')
    
    player = turtlebot_motion.MotionPlayer()
    player.loginfo("Initialized")
    player.spin()
    player.loginfo("Bye Bye")

