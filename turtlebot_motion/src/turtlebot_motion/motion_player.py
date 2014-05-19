#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
import motion_retargeting_msgs as m_msgs
from .motion import motion_dict

class MotionPlayer(object):

    def __init__(self):
        self.motion_dict = motion_dict

        self._init_ros_apis()

    def _init_ros_apis():
        self.pub = {}
        self.pub['list_motion'] = rospy.Publisher('list_motion',m_msgs.MotionList, latch=True)
        self.pub['motion_response'] = rospy.Publisher('playback_status', m_msgs.PlaybackStatus)

        self.sub = {}
        self.sub['motion_playack'] = rospy.Subscriber('motion_playback', m_msgs.MotionPlayback, self.process_motion_playback)

    def process_motion_playback(self, msg): 
        self.loginfo('Received Motion playback request')

        m = msg.motion_name
        motion_dict[m]()

    def spin(self):
        rospy.spin()

    def loginfo(self,msg):
        rospy.loginfo('Motion Player : ' + str(msg))
