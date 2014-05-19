#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
from geometry_msgs import Twist

pub_cmd_vel = rospy.Publisher('~cmd_vel', Twist)

timeout = rospy.get_param('timeout', 1.0)

motion_dict = {}
motion_dict['forward'] = forward
motion_dict['backward'] = backward

def forward():
    t = Twist()
    t.linear = 0.1
    pub_cmd_vel.publish(t)
    rospy.sleep(timeout)


def backward():
