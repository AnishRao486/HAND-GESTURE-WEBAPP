//https://teachablemachine.withgoogle.com/models/GQM_VlfkZ/

var prediction1="";
var prediction2="";

Webcam.set({
   width : 350,
   height : 300,
   image_format :'png',
   png_quality : 90
   
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function  takeSnap(){
   Webcam.snap( function(data_uri){
       document.getElementById("result").innerHTML = '<img id="capture_img" src="'+data_uri+'"/>'
   });
}

console.log("ml5.version = ",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GQM_VlfkZ/model.json", modelLoaded);

function modelLoaded(){
console.log("Model Loaded");
}

function speak(){
   var synth = window.speechSynthesis;
   speak_pred_1 = "Prediction one is "+ prediction1;
   speak_pred_2 = "and prediction two is"+prediction2;
   var utterThis = new SpeechSynthesisUtterance(speak_pred_1 + speak_pred_2);
   synth.speak(utterThis);
}

function check(){
   img = document.getElementById("capture_img");
   classifier.classify(img,gotResult);
}

function gotResult(error, results){
   if(error){
       console.error(error);
   }
   else {
       console.log(results);
       document.getElementById("gesture").innerHTML = results[0].label;
       document.getElementById("gesture2").innerHTML = results[1].label;
       prediction1 = results[0].label;
       prediction2 = results[1].label;
       speak();
       if (results[0].label == "Quiet"){
          document.getElementById("update_gesture").innerHTML ="&#129304;";
       }
       if (results[0].label == "Thumbs"){
           document.getElementById("update_gesture").innerHTML ="&#128077;";
       }
       if (results[0].label == "Ok"){
           document.getElementById("update_gesture").innerHTML ="&#128076;";
       }
       if (results[1].label == "Quiet"){
           document.getElementById("update_gesture2").innerHTML ="&#129304;";
       }
       if (results[1].label == "Thumbs"){
           document.getElementById("update_gesture2").innerHTML ="&#128077;";
       }
       if (results[1].label == "Ok"){
           document.getElementById("update_gesture2").innerHTML ="&#128076;";
       }
   }
}