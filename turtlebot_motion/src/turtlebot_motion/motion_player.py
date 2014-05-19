#
# License: BSD
#   https://raw.github.com/robotics-in-concert/rocon_storytelling/license/LICENSE
#

import rospy
import motion_retargeting_msgs.msg as m_msgs
from .motion import Motions 
from .status import code_string

class MotionPlayer(object):

    def __init__(self):
        self._init_ros_apis()
        self._motions = Motions()

    def _init_ros_apis(self):
        self.pub = {}
        self.pub['list_motion'] = rospy.Publisher('list_motion',m_msgs.MotionList, latch=True)
        self.pub['motion_response'] = rospy.Publisher('playback_status', m_msgs.PlaybackStatus, latch=True)

        self.sub = {}
        self.sub['motion_playack'] = rospy.Subscriber('motion_playback', m_msgs.MotionPlayback, self.process_motion_playback)

    def process_motion_playback(self, msg): 
        self.loginfo('Received Motion playback request')

        m = msg.motion_name

        if not self.status.status_code.value is m_msgs.PlaybackStatusCodes.IDLING:
            self.loginfo('Motion Player is not IDLE Error')
            self.set_status(m_msgs.PlaybackStatusCodes.GENERAL_ERROR)
            return

        if not m in self._motions.motion_dict:
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK_ERROR)
            self.loginfo('Invalid motion is requested')

        if msg.start_playback:
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK)
            self._motions.motion_dict[m]()
            self.set_status(m_msgs.PlaybackStatusCodes.PLAYBACK_FINISHED)
            rospy.sleep(0.8)
            self.set_status(m_msgs.PlaybackStatusCodes.IDLING)

    def set_status(self, status):
        s = m_msgs.PlaybackStatus()
        s.status_code.value = status
        s.status_message = code_string[status]
        self.status = s 

    def pub_motion_list(self):
        
        mlist = m_msgs.MotionList()
        
        for k,v in self._motions.motion_dict_desc.items():
            m = m_msgs.Motion()
            m.motion_name = k
            m.motion_description = v
            mlist.motions.append(m)
        self.pub['list_motion'].publish(mlist)
             
    def spin(self):
        self.pub_motion_list()
        self.set_status(m_msgs.PlaybackStatusCodes.IDLING)

        while not rospy.is_shutdown():
            self.pub['motion_response'].publish(self.status)
            rospy.sleep(0.3)

    def loginfo(self,msg):
        rospy.loginfo('Motion Player : ' + str(msg))
