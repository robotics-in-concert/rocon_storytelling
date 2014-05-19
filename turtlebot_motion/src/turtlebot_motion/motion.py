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
motion_dict['rotate_left'] = rotate_left
motion_dict['rotate_right'] = rotate_right

def forward():
    send_comand(1.0, 0.0, timeout)

def backward():
    send_comand(-1.0, 0.0, timeout)

def rotate_left():
    send_comand(0.0, -1.0, timeout)

def rotate_right():
    send_comand(0.0, 1.0, timeout)


def send_command(x, z, timeout):
    t = Twist()
    t.linear.x = x
    t.angular.z = z

    start = rospy.Time.now()

    while not rospy.is_shutdown():
        current = rospy.Time.now()

        if start + timeout < current:
            break
        pub_cmd_vel.publish(t)
        rospy.sleep(0.1)
