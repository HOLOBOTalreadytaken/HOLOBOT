const NET = require('net');
var client = new NET.Socket();
var http = require('http');
var fs = require('fs');


client.connect(8080, '192.168.0.11', function(){
 console.log('Connected');
 client.write('robotSelected:Hexapod 1');
});



fs.readFile('./index.html', 'utf-8', function(error, content) {
	htmlFile = content;
    });

fs.readFile('./css/mobile.css', 'utf-8', function(error, content) {
	css1 = content;
    });

fs.readFile('./css/bootstrap.css', 'utf-8', function(error, content) {
	css2 = content;
    });

fs.readFile('./img/game.png', function(error, content) {
	img1 = content;
    });
fs.readFile('./img/Main.png', function(error, content) {
	img2 = content;
    });
fs.readFile('./img/rotation_left.png', function(error, content) {
	img3 = content;
    });
fs.readFile('./img/rotation_right.png', function(error, content) {
	img4 = content;
    });
fs.readFile('./img/chevron-up.png', function(error, content) {
	img5 = content;
    });
fs.readFile('./img/chevron-down.png', function(error, content) {
	img6 = content;
    });
fs.readFile('./img/chevron-left.png', function(error, content) {
	img7 = content;
    });
fs.readFile('./img/chevron-right.png', function(error, content) {
	img8 = content;
    });
fs.readFile('./img/Stop.png', function(error, content) {
	img9 = content;
    });
	
// Chargement du fichier index.html et des css affichés au client
var server = http.createServer(function(req, res) {
    switch(req.url) {
	case "/css/mobile.css":
		res.writeHead(200,{"Content-Type":"text/css"});
		res.write(css1);
		break;
	case "/css/bootstrap.css":
		res.writeHead(200,{"Content-Type":"text/css"});
		res.write(css2);
		break;
	case "/img/game.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img1);
		break;
	case "/img/Main.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img2);
		break;
	case "/img/rotation_left.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img3);
		break;
	case "/img/rotation_right.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img4);
		break;
	case "/img/chevron-up.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img5);
		break;
	case "/img/chevron-down.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img6);
		break;
	case "/img/chevron-left.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img7);
		break;
	case "/img/chevron-right.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img8);
		break;
	case "/img/Stop.png":
		res.writeHead(200,{"Content-Type":"image/png"});
		res.write(img9);
		break;
	default : 
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(htmlFile);
	}
	res.end();
});
 
// Chargement de socket.io
var io = require('socket.io').listen(server);



// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {

    console.log('Un client est connecté !');

    socket.on('message0',function(message){
      stop();
    });
    socket.on('message1',function(message){
      stepForward();
    });
    socket.on('message2',function(message){
      stepBackward();
    });
    socket.on('message3',function(message){
      stepLeft();
    });
    socket.on('message4',function(message){
      stepRight();
    });
    socket.on('message5',function(message){
      standUp();
    });
    socket.on('message6',function(message){
      sitDown();
    });
    socket.on('message7',function(message){
      changeButtonMode();
    });
    socket.on('message8',function(message){
      demo1();
    });
	socket.on('message9',function(message){
      ArmUp();
    });
	socket.on('message10',function(message){
      ArmDown();
    });
	socket.on('message11',function(message){
      Plier();
    });
	socket.on('message12',function(message){
      RightRotationBase();
    });
	socket.on('message13',function(message){
      LeftRotationBase();
    });
	socket.on('message14',function(message){
      HeadUp();
    });
	socket.on('message15',function(message){
      HeadDown();
    });
});


server.listen(8080);

function stop(){
  console.log('Stop');
  client.write('controlRobot:0');
}
function stepForward(){
  console.log('Forward');
  client.write('controlRobot:1');
}
function stepBackward(){
  console.log('Backward');
  client.write('controlRobot:2');
}
function stepRight(){
  console.log('Right');
  client.write('controlRobot:3');
}
function stepLeft(){
  console.log('Left');
  client.write('controlRobot:4');
}
function standUp(){
  console.log('up')
  client.write('controlRobot:5')
}
function sitDown(){
  console.log('Down');
  client.write('controlRobot:6');
}
function changeButtonMode(){
  console.log('Changing button mode');
  client.write('controlRobot:7');
}
function demo1(){
  console.log('Demo1');
  client.write('controlRobot:8');
}
function ArmUp(){
  console.log('ArmUp');
  client.write('controlRobot:9');
}
function ArmDown(){
  console.log('ArmDown');
  client.write('controlRobot:10');
}
function Plier(){
  console.log('Plier');
  client.write('controlRobot:11');
}
function RightRotationBase(){
  console.log('RightRotationBase');
  client.write('controlRobot:12');
}
function LeftRotationBase(){
  console.log('LeftRotationBase');
  client.write('controlRobot:13');
}
function HeadUp(){
  console.log('HeadUp');
  client.write('controlRobot:14');
}
function HeadDown(){
  console.log('HeadDown');
  client.write('controlRobot:15');
}




// 0 arret
// 1 en avant
// 2 en arriere
// 4 gauche
// 3 droite
// 5 up
// 6 down
// 7 mode
// 8 demo
