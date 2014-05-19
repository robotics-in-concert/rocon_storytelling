#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
import motion_retargeting_msgs as m_msgs
from .motion import motion_dict
from .status import code_string

class MotionPlayer(object):

    def __init__(self):
        self.motion_dict = motion_dict

        self._init_ros_apis()

    def _init_ros_apis():
        self.pub = {}
        self.pub['list_motion'] = rospy.Publisher('list_motion',m_msgs.MotionList, latch=True)
        self.pub['motion_response'] = rospy.Publisher('playback_status', m_msgs.PlaybackStatus, latch=True)

        self.sub = {}
        self.sub['motion_playack'] = rospy.Subscriber('motion_playback', m_msgs.MotionPlayback, self.process_motion_playback)
        self.status_code = 

    def process_motion_playback(self, msg): 
        self.loginfo('Received Motion playback request')

        m = msg.motion_name

        if not self.status is m_msgs.PlaybackStatusCodes.IDLING:
            self.loginfo('Motion Player is not IDLE Error')
            self.set_status(m_msgs.PlaybackStatusCodes.GENERAL_ERROR)

        if not m in motion_dict:
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK_ERROR)
            self.loginfo('Invalid motion is requested')

        if msg.start_playback:
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK)
            motion_dict[m]()
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK_FINISHED)
            rospy.sleep(0.2)
            self.set_status(m_msgs.PlaybackStatusCodes.IDLING)

    def set_status(self, status):
        s = m_msgs.PlaybackStatus()
        s.status_code = status
        s.status_message = code_string[status]
        self.status = s 
             
    def spin(self):
        while not rospy.is_shutdown():
            self.pub['motion_response'].publish(self.status)
            rospy.sleep(0.1)

    def loginfo(self,msg):
        rospy.loginfo('Motion Player : ' + str(msg))
