const start=document.getElementById('start');
const stop=document.getElementById('stop');

const recording=document.getElementById('last-recording');

var mediaRecorder;
let stop1;
start.addEventListener('click', async function(){
     stop1 = await recordScreen();
   
    mediaRecorder = createRecorder(stop1);

})

stop.addEventListener('click', function(){
   
    mediaRecorder.stop();
    let tracks=stop1.getTracks();
    tracks.forEach(element => {
        element.stop();
    });
    stop1=null;
    
})



async function recordScreen() {
  return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
}

function createRecorder (stream) {

  let recordedChunks = []; 

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
        recordedChunks.push(e.data);
  };
  mediaRecorder.onstop = function () {
     saveFile(recordedChunks);
    
     recordedChunks = [];
  };
  mediaRecorder.start(1000); 
  return mediaRecorder;
}

function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    let filename = window.prompt('Enter file name'),
        downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    recording.src=downloadLink.href;
    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); 
    document.body.removeChild(downloadLink);
}

window.addEventListener("keypress",function(e){
    if(e.key=='s'){
    var vedio=document.getElementById("last-recording");
    console.log(vedio);
    var canvas=document.createElement('canvas');
    canvas.width=1200;
    canvas.height=500;
    var ctx=canvas.getContext('2d');
    ctx.drawImage(vedio,0,0,canvas.width,canvas.height);
    var dataURI = canvas.toDataURL('image/png');
   
    
    var a=document.createElement('a');
     document.body.appendChild(a);
     a.download="image.png";
     a.href=dataURI;
     a.click();
     document.body.removeChild(a);
    }
})
