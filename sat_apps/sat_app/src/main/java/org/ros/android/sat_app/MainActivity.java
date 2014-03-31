/*
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package org.ros.android.sat_app;

import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.speech.tts.TextToSpeech;
import android.util.Base64;
import android.util.Log;
import android.widget.ImageView;
import android.widget.Toast;
import android.widget.VideoView;

import org.ros.address.InetAddressFactory;
import org.ros.android.RosActivity;
import org.ros.android.view.RosTextView;
import org.ros.message.MessageListener;
import org.ros.namespace.GraphName;
import org.ros.node.AbstractNodeMain;
import org.ros.node.ConnectedNode;
import org.ros.node.NodeConfiguration;
import org.ros.node.NodeMainExecutor;
import org.ros.node.topic.Publisher;
import org.ros.node.topic.Subscriber;

import java.io.IOException;
import java.io.InputStream;
import java.lang.String;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Locale;


/**
 * @author damonkohler@google.com (Damon Kohler)
 */
public class MainActivity extends RosActivity implements TextToSpeech.OnInitListener, TextToSpeech.OnUtteranceCompletedListener {

    private RosTextView<std_msgs.String> rosTextView;
    private TextToSpeech mTTS;
    private boolean misInitTTS;
    private ContentsPlayer mCP;

    public MainActivity() {
        // The RosActivity constructor configures the notification title and ticker
        // messages.
        super("SAT Contents Player", "SAT Contents Player");
    }

    @SuppressWarnings("unchecked")
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        mTTS = new TextToSpeech(this,this);

    }

    @Override
    protected void init(NodeMainExecutor nodeMainExecutor) {
        mCP = new ContentsPlayer();
        //NodeConfiguration nodeConfiguration = NodeConfiguration.newPrivate();
        // At this point, the user has already been prompted to either enter the URI
        // of a master to use or to start a master locally.
        NodeConfiguration nodeConfiguration = NodeConfiguration.newPublic(InetAddressFactory.newNonLoopback().getHostAddress(), getMasterUri());
        Log.d("TEST_APP", "get Master URI" + getMasterUri());
        Log.d("TEST_APP", "get Master URI HOST" + getMasterUri().getHost());
        Log.d("TEST_APP", "get Master URI PORT" + getMasterUri().getPort());
        nodeMainExecutor.execute(mCP, nodeConfiguration);

        Message face_viewer_msg = Message.obtain();
        Bundle data = new Bundle();
        data.putString("face_image","cento_logo.jpg");
        face_viewer_msg.setData(data);
        face_viewer_msg.what = 1;
        handler.sendMessage(face_viewer_msg);
    }
    @Override
    public void onInit(int status) {
        misInitTTS = status == TextToSpeech.SUCCESS;
        String msg = misInitTTS ? "success" : "fail" ;
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
        mTTS.setLanguage(Locale.KOREAN);//set the language
        mTTS.setOnUtteranceCompletedListener(this);// set the callback of tts end
    }

    @Override
    public void onUtteranceCompleted(String s) {
        Log.d("TEST_APP", "[MainActivity][TTS_SUB] "+s);
        Log.d("TEST_APP", "[MainActivity][TTS_SUB]End TTS");
        mCP.response_tts("[MainActivity][TTS_SUB] End TTS");
    }

    final Handler handler = new Handler(){
        @Override
        public void handleMessage(Message msg){
            if(msg.what==1){
                VideoView vv = (VideoView)findViewById(R.id.videoView);
                Bundle data = msg.getData();
                Log.d("TEST_APP", data.getString("face_image"));
                String image_name = data.getString("face_image");

                String uriPath = "android.resource://"+getPackageName()+"/"+R.raw.de01;
                if (image_name.equals("angry")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.angry02;
                }
                else if(image_name.equals("default")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.de01;
                }
                else if(image_name.equals("disappoint")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.disa01;
                }
                else if(image_name.equals("fear")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.fear01;
                }
                else if(image_name.equals("happy")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.happy03;
                }
                else if(image_name.equals("sad")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.sad03;
                }
                else if(image_name.equals("shame")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.shame01;
                }
                else if(image_name.equals("surprise")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.sup02;
                }
                else if(image_name.equals("think")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.think01;
                }
                else if(image_name.equals("wink")){
                    uriPath = "android.resource://"+getPackageName()+"/"+R.raw.wink01;
                }
                else{

                }

                Uri uri = Uri.parse(uriPath);
                vv.setVideoURI(uri);
                vv.requestFocus();
                vv.start();


//                ImageView iv = (ImageView)findViewById(R.id.face_viewer);
//                Bundle data = msg.getData();
//                Log.d("TEST_APP", data.getString("face_image"));
//                String image_name = data.getString("face_image");
//                InputStream is = getClass().getResourceAsStream("/res/drawable/" + image_name);
//                if(is == null){
//                    Log.d("TEST_APP", "No image");
//                    is = getClass().getResourceAsStream("/res/drawable/" + "no_image.png");
//                }
//                else{
//                    Log.d("TEST_APP", "Yes image");
//                }
//                iv.setImageDrawable(Drawable.createFromStream(is, ""));
            }
            else if(msg.what ==2){
//                VideoView vv = (VideoView)findViewById(R.id.videoView);
//
//                String uriPath = "android.resource://"+getPackageName()+"/"+R.raw.happy03;
//                Uri uri = Uri.parse(uriPath);
//                vv.setVideoURI(uri);
//                vv.requestFocus();
//                vv.start();
            }
        }
    };

    public class ContentsPlayer extends AbstractNodeMain {
        private Publisher<std_msgs.String> tts_pub = null;
        private Publisher<std_msgs.String> face_pub = null;

        public void response_tts(String msg){
            std_msgs.String res_msg = tts_pub.newMessage();
            res_msg.setData(msg);
            tts_pub.publish(res_msg);
        }

        public InputStream getInputStreamFromURL(String src) {
            HttpURLConnection connection = null;
            try {
                URL url = new URL(src);
                connection = (HttpURLConnection) url.openConnection();
                connection.setDoInput(true);
                connection.connect();
                return connection.getInputStream();

            } catch (IOException e) {
                e.printStackTrace();
                return null;
            } finally{
                if(connection!=null)connection.disconnect();
            }
        }

        @Override
        public GraphName getDefaultNodeName() {
            return GraphName.of("test_app");
        }

        @Override
        public void onStart(ConnectedNode connectedNode) {
            //pub
            String tts_pub_topic = "/tts_response";
            String face_pub_topic = "/face_response";


            String tts_sub_topic = "/sat_tts";
            String face_sub_topic = "/sat_face";

            //set the publisher
            tts_pub =
                    connectedNode.newPublisher(tts_pub_topic, std_msgs.String._TYPE);
            face_pub =
                    connectedNode.newPublisher(face_pub_topic, std_msgs.String._TYPE);

            //set the subscriber
            ////////////////////////////////////////////////////////////////////////////////////////////////
            Subscriber<std_msgs.String> tts_sub =
                    connectedNode.newSubscriber(tts_sub_topic, std_msgs.String._TYPE);

            tts_sub.addMessageListener(new MessageListener<std_msgs.String>() {
                @Override
                public void onNewMessage(std_msgs.String message) {
                    String msg_base64 = new String(Base64.decode(message.getData(), 0));
                    Log.d("TEST_APP", "[MainActivity][TTS_SUB][Base64]" + msg_base64);
                    Log.d("TEST_APP", "[MainActivity][TTS_SUB]Play TTS");
                    HashMap<String, String> myHashAlarm = new HashMap();
                    myHashAlarm.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "end of wakeup message ID");
                    mTTS.speak(msg_base64, TextToSpeech.QUEUE_ADD, myHashAlarm);// play the tts after finished previous tts

                }
            });

            ////////////////////////////////////////////////////////////////////////////////////////////////
            Subscriber<std_msgs.String> face_sub =
                    connectedNode.newSubscriber(face_sub_topic, std_msgs.String._TYPE);

            face_sub.addMessageListener(new MessageListener<std_msgs.String>() {
                @Override
                public void onNewMessage(std_msgs.String message) {
                    Log.d("TEST_APP", "[MainActivity][FACE_SUB]" + message.getData());
                    Message face_viewer_msg = Message.obtain();
                    Bundle data = new Bundle();
                    data.putString("face_image",message.getData());
                    face_viewer_msg.setData(data);
                    face_viewer_msg.what = 1;
                    handler.sendMessage(face_viewer_msg);
                    std_msgs.String res_msg = face_pub.newMessage();
                    res_msg.setData("End Face");
                    face_pub.publish(res_msg);
                }
            });
        }
    }
}
