#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    
    myVideo.loadMovie("shading.mov");
    myVideo.play();
    myVideo.setLoopState(OF_LOOP_NORMAL);

}

//--------------------------------------------------------------
void ofApp::update(){
    myVideo.update();
    
    if(myVideo.isFrameNew()){
        flow.calcOpticalFlow(myVideo);
    }

}

//--------------------------------------------------------------
void ofApp::draw(){
    
    ofSetColor(255);
    ofLine(10,10,100,100);
    myVideo.draw(0,0);
    flow.draw(0,0);
    
    vector<ofPoint> keypoints = flow.getCurrent();
    for(int i=0;i<keypoints.size();i++){
            points.push_back(keypoints[i]);
    }

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
    
    points.clear();
    vector<KeyPoint> keypoints;
    vector<KeyPoint> keypointsInside;
    vector<cv::Point2f> featuresToTrack;
    copyGray(myVideo, myVideoGray);
    FAST(myVideoGray,keypoints,2);
    KeyPoint::convert(keypointsInside,featuresToTrack);
    flow.setFeaturesToTrack(featuresToTrack);


}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
