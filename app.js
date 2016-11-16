// Express stuff
var express = require('express')
var app = express()
var firebase = require('firebase')
var fb = new firebase('https://need2wee.firebaseio.com/occupied')

// Audio stuff
var youtubeStream = require('youtube-audio-stream');
var Lame = require('lame');
var Speaker = require('speaker');

var toiletMusicStream;
var toiletDecoder = new Lame.Decoder;
var toiletSpeaker = new Speaker;

// Magnet stuff
var magnetSwitch;
var magnet = require("pi-pins").connect(17);
magnet.mode('in');
magnetSwitch = 0;

// Thinking music
var clips = [
  "rTyN-vvFIkE",
  "Ag1o3koTLWM",
  "hATmBOnMJJkE",
  "kZ8KK8u9dN8"
];

app.get('/', function (req, res) {
  res.send('Need2Wee online: ' + magnet.value())
});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening to wees on http://%s:%s', host, port)
});

magnet.on('both', function () {

console.log(magnet.value());

if (magnet.value() == true) {
  fb.set({
    occupied: "true"
  });

  try {
    toiletMusicStream = youtubeStream(randomClip()).pipe(toiletDecoder).pipe(toiletSpeaker);
  } catch (exception) {
    console.log("Audio exception: " + exception);
  }

} else if(magnet.value() == false){
  fb.set({
    occupied: "false"
  });

  if (toiletMusicStream) {
    toiletMusicStream.end();
    toiletDecoder = new Lame.Decoder;
    toiletSpeaker = new Speaker;
    
  }
}
});

function randomClip() {
  var id = clips[Math.floor(Math.random()*clips.length)];
  return 'https://www.youtube.com/watch?v=' + id;
}
