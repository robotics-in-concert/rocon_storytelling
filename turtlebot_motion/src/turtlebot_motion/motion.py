#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
from geometry_msgs.msg import Twist

class Motions():

    def __init__(self):
        self.pub_cmd_vel = rospy.Publisher('~cmd_vel', Twist)
        self.timeout = rospy.get_param('~timeout', 1.0)
        self.x_vel = rospy.get_param('~x_vel', 0.4)
        self.z_vel = rospy.get_param('~z_vel', 1.0)
        self._init_motions()


    def _init_motions(self):
        motion_dict = {}
        motion_dict['forward'] = self.forward
        motion_dict['backward'] = self.backward
        motion_dict['rotate_left'] = self.rotate_left
        motion_dict['rotate_right'] = self.rotate_right

        motion_dict_desc = {}
        motion_dict_desc['forward'] = 'move forward'
        motion_dict_desc['backward'] = 'move backward'
        motion_dict_desc['rotate_left'] = 'rotate left'
        motion_dict_desc['rotate_right'] = 'rotate right'

        self.motion_dict = motion_dict
        self.motion_dict_desc = motion_dict_desc

    def forward(self):
        self.send_command(self.x_vel, 0.0, self.timeout)

    def backward(self):
        self.send_command(-self.x_vel, 0.0, self.timeout)

    def rotate_left(self):
        self.send_command(0.0, self.z_vel, self.timeout)

    def rotate_right(self):
        self.send_command(0.0, -self.z_vel, self.timeout)


    def send_command(self, x, z, timeout):
        t = Twist()
        t.linear.x = x
        t.linear.y = 0.0
        t.linear.z = 0.0
        t.angular.x = 0.0
        t.angular.y = 0.0
        t.angular.z = z

        start = rospy.Time.now()

        while not rospy.is_shutdown():
            current = rospy.Time.now()
            tt = rospy.Duration(timeout)

            if start + tt < current:
                break
            self.pub_cmd_vel.publish(t)
            rospy.sleep(0.1)
