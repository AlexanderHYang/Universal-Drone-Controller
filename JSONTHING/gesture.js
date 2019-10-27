var paused = false;
var pauseOnGesture = false;
var focusListener;
var blurListener;
let WebSocket= require('ws');

console.log('test');

const noble = require('noble');

noble.on('discover', function(peripheral) {
  console.log('yeet');
  console.log(peripheral.address);
  peripheral.connect(function(error) {
    console.log('connected to peripheral: ' + peripheral.uuid);
  });
});


noble.on("scanStart",function(){
  console.log("started scanning");
});

noble.startScanning(true); // any service UUID, no duplicates

noble.on("stateChange",function(state){
  console.log(state);
});




//console.log(WebSocket);
// Create the socket with event handlers
// Create and open the socket
const ws = new WebSocket("ws://localhost:6437/v6.json");

    // On successful connection
    ws.onopen = function(event) {
        var enableMessage = JSON.stringify({enableGestures: true});
        ws.send(enableMessage); // Enable gestures
        ws.send(JSON.stringify({focused: true})); // claim focus

        /*focusListener = window.addEventListener('focus', function(e) {
                               ws.send(JSON.stringify({focused: true})); // claim focus
                         });

        blurListener = window.addEventListener('blur', function(e) {
                               ws.send(JSON.stringify({focused: false})); // relinquish focus
                         });*/
        console.log("connected");
        //console.log(win.webContents);
        /*document.getElementById("main").style.visibility = "visible";
        document.getElementById("connection").innerHTML = "WebSocket connection open!";*/
    };

    // On message received
    ws.onmessage = function(event) {
        if (!paused) {
            var obj = JSON.parse(event.data);
            var str = JSON.stringify(obj, undefined, 2);
            //console.log(str);
            /*if (pauseOnGesture && obj.gestures.length > 0) {
                togglePause();
            }*/
            
            if(obj.gestures && obj.gestures.length){
                //console.log(typeof(obj.gestures));
                //win.webContents.executeJavascript('document.getElementById("toReplace").innerHTML=obj.gestures;');
                console.log(obj.gestures[0].type+" committed");
                noble.stopScanning();
            }
        }
    };
    


    // Once dom-ready
    ws.onclose = function(event) {
        ws = null;
    }

    // On socket error
    ws.onerror = function(event) {
      console.error("socket glitched");
    };
