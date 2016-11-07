// Express stuff
var express = require('express')
var app = express()
var firebase = require('firebase')
var fb = new firebase('https://need2wee.firebaseio.com/occupied')

// Audio stuff
var youtubeStream = require('youtube-audio-stream');
var Lame = require('lame');
var Speaker = require('speaker');
var requestUrl = 'https://www.youtube.com/watch?v=rTyN-vvFIkE'; // Thinking music

var toiletMusicStream;
var toiletDecoder = new Lame.Decoder;
var toiletSpeaker = new Speaker;

// Magnet stuff
var magnetSwitch;
var magnet = require("pi-pins").connect(17);
magnet.mode('in');
magnetSwitch = 0;



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
        toiletMusicStream = youtubeStream(requestUrl).pipe(toiletDecoder).pipe(toiletSpeaker);
      } catch (exception) {
        console.log("Audio exception: " + exception);
      }

		} else if(magnet.value() == false){
			fb.set({
				occupied: "false"
			});

      toiletMusicStream.end();
		}
});
