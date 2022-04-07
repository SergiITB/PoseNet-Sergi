let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let actor_img;
let specs,smoke;

function setup() {  // this function runs only once while running
    createCanvas(800, 500);
    //console.log("setup funct");
    capture = createCapture(VIDEO);
    capture.hide();

    //load the PoseNet model
    posenet = ml5.poseNet(capture, modelLOADED);
    //detect pose
    posenet.on('pose', recievedPoses);

    actor_img = loadImage('images/shahrukh.png');
    irritedeyes = loadImage('images/irritedeye.png');
    blackhole = loadImage('images/blackhole1.png');
    nariz = loadImage('images/nariz.png');
}

function recievedPoses(poses) {
    console.log(poses);

    if(poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLOADED() {
    console.log("model has loaded");
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function draw() { // this function code runs in infinite loop
    
    image(capture, 0, 0);

    r = getRandomArbitrary(0, 255);
    g = getRandomArbitrary(0, 255);
    b = getRandomArbitrary(0, 255);
    fill(r,g,b);
    
    if(singlePose) {
        for(let i=0; i<singlePose.keypoints.length; i++) {
            image(blackhole,singlePose.keypoints[i].position.x-10, singlePose.keypoints[i].position.y-10, 20,20);
        }

        stroke(r, g, b);
        strokeWeight(3);

        for(let j=0; j<skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }

        image(nariz, singlePose.nose.x-10, singlePose.nose.y-10, 25, 25);
        image(irritedeyes, singlePose.leftEye.x-10, singlePose.leftEye.y-10, 25,25);
        image(irritedeyes, singlePose.rightEye.x-10, singlePose.rightEye.y-10, 25,25);
    }
}
