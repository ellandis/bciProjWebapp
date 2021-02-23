var game;
window.onload=function()
{
    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 640,
        parent: 'phaser-game',
        scene: [SceneMain]
    };
    game = new Phaser.Game(config);
}

//webSocket = new WebSocket(url, protocols);
var bci2guiSocket = new WebSocket("wss://www.example.com/socketserver", "protocolOne");
var bci2guiSocket = new WebSocket("wss://www.example.com/socketserver", ["protocolOne", "protocolTwo"]);
// The URL to which to connect; this should 
// be the URL to which the WebSocket server will respond. 
// This should use the URL scheme wss:
//, although some software may allow you to use the insecure ws:// for local connections.

// Sending data to the server
bci2guiSocket.send("Here's some text that the server is urgently awaiting!");
// You can send data as a string, Blob, or ArrayBuffer.
// The Blob object represents a blob, which is a 
// file-like object of immutable, raw data; 
// they can be read as text or binary data, or 
// converted into a ReadableStream so its methods 
// can be used for processing the data.

bci2guiSocket.onopen = function (event) {
    bci2guiSocket.send("Here's some text that the server is urgently awaiting!");
  };

//   Using JSON to transmit objects

// Send text to all users through the server
function sendText() {
    // Construct a msg object containing the data the server needs to process the message from the chat client.
    var msg = {
      type: "message",
      text: document.getElementById("text").value,
      id:   clientID,
      date: Date.now()
    };
  
    // Send the msg object as a JSON-formatted string.
    bci2guiSocket.send(JSON.stringify(msg));
  
    // Blank the text input element, ready to receive the next line of text from the user.
    document.getElementById("text").value = "";
  }

//   Receiving messages from the server
// Let's consider the chat client application first alluded to in Using 
// JSON to transmit objects. There are assorted types of data packets
// the client might receive, such as:

// Login handshake
// Message text
// User list updates
//code example

bci2guiSocket.onmessage = function(event) {
    var f = document.getElementById("chatbox").contentDocument;
    var text = "";
    var msg = JSON.parse(event.data);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();
  
    switch(msg.type) {
      case "id":
        clientID = msg.id;
        setUsername();
        break;
      case "username":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;
      case "message":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        break;
      case "rejectusername":
        text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>"
        break;
      case "userlist":
        var ul = "";
        for (i=0; i < msg.users.length; i++) {
          ul += msg.users[i] + "<br>";
        }
        document.getElementById("userlistbox").innerHTML = ul;
        break;
    }
  
    if (text.length) {
      f.write(text);
      document.getElementById("chatbox").contentWindow.scrollByPages(1);
    }
  };


  //Closing the connection
  bci2guiSocket.close();