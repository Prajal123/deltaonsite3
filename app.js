const start=document.getElementById('start');
const stop=document.getElementById('stop');

const recording=document.getElementById('last-recording');

var mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    let mimeType = 'video/webm';
    mediaRecorder = createRecorder(stream);

})

stop.addEventListener('click', function(){
    mediaRecorder.stop();
 
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
