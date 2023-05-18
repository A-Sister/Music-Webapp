song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
song_status = "";


function preload() {
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.position(670,300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses)
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}

function gotPoses(results){
    if(results.length > 0) {
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score: "+score_leftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWrist X - "+leftWristX+" leftWrist Y - "+leftWristY+" rightWrist X - " +rightWristX+" rightWrist Y - "+rightWristY);
    }
}

function draw() {
    image(video,0,0,600,500);

    song_status = song1.isPlaying();

    fill("#990000");
    stroke("#990000");

    if(score_leftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song_status == false){
            song1.play();
            document.getElementById("name").innerHTML = "Song Playing:  Peter Pan Song";
        }
    }
}

