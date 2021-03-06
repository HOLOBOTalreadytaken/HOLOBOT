/* Creation of messages for Hexapod*/
var dataPacketGoForward = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodGoForward",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 128,
      "V_left_joystick" : 254,
      "H_left_joystick" : 128,
      "buttons" : 0
    }
  }
};

var dataPacketGoBackward = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodGoBackward",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 128,
      "V_left_joystick" : 1,
      "H_left_joystick" : 128,
      "buttons" : 0
    }
  }
};

var dataPacketGoLeft = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodGoLeft",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 1,
      "V_left_joystick" : 128,
      "H_left_joystick" : 128,
      "buttons" : 0
    }
  }
};

var dataPacketGoRight = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodGoRight",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 254,
      "V_left_joystick" : 128,
      "H_left_joystick" : 128,
      "buttons" : 0
    }
  }
};

var dataPacketUp = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodUpDown",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 128,
      "V_left_joystick" : 128,
      "H_left_joystick" : 128,
      "buttons" : 16
    }
  }
};

var dataPacketChangeColor = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "changeColor",
    "parameters":
    {
      "R" : 128,
      "G" : 128,
      "B" : 128
    }
  }
};

var dataPacketArmUp = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "ArmUp",
	"parameters":
	{
		"A_joystick" : 1
	}
  }
};

var dataPacketArmDown = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "ArmDown",
	"parameters":
	{
		"A_joystick" : 1
	}
  }
};

var dataPacketPlier = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "Plier",
	"parameters":
	{
		"P_joystick" : 1
	}
  }
};

var dataPacketRightRotationBase = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "RightRotation",
	"parameters":
	{
		"B_joystick" : 1
	}
  }
};

var dataPacketLeftRotationBase = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "LeftRotation",
	"parameters":
	{
		"B_joystick" : 1
	}
  }
};

var dataPacketHeadUp = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "HeadUp",
	"parameters":
	{
		"H_joystick" : 1
	}
  }
};

var dataPacketHeadDown = {
  "receiver" : "MATRIX_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "HeadDown",
	"parameters":
	{
		"H_joystick" : 1
	}
  }
};

var dataPacketSTOP = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodStop",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 128,
      "V_left_joystick" : 128,
      "H_left_joystick" : 128,
      "buttons" : 0
    }
  }
};

var dataPacketModeButton = {
  "receiver" : "HEXAPOD_ID",
  "sender" : "HOLOLENS_ID",
  "body_message":
  {
    "func" : "hexapodMode",
    "parameters":
    {
      "V_right_joystick" : 128,
      "H_right_joystick" : 128,
      "V_left_joystick" : 128,
      "H_left_joystick" : 128,
      "buttons" : 128
    }
  }
};

function hexapodMovement(V_right_joystick,H_right_joystick,V_left_joystick,H_left_joystick,buttons){
  var dataPacket = {
    "receiver" : "HEXAPOD_ID",
    "sender" : "HOLOLENS_ID",
    "body_message":
    {
      "func" : "",
      "parameters":
      {
        "V_right_joystick" : V_right_joystick,
        "H_right_joystick" : H_right_joystick,
        "V_left_joystick" : V_left_joystick,
        "H_left_joystick" : H_left_joystick,
        "buttons" : buttons
      }
    }
  };

  var dataPacketJSON = JSON.stringify(dataPacket);
  return dataPacketJSON;
}

/*Switch mode until you reach the desired mode
0 : control of every leg
1 : swing 1
2 : swing 2
3 : single leg
4 : nothing discovered yet
*/
function switchMode(desiredMode,mqttClient,setup,mode,timer){
  while(mode != desiredMode) {
  	setTimeout(function() {mqttClient.publish(setup.tin, dataPacketModeJSON, {qos: setup.qos});},timer);
  	timer = timer + 300;
    setTimeout(function() {mqttClient.publish(setup.tin, dataPacketStopJSON, {qos: setup.qos});},timer);
    timer = timer + 500;
    mode = (mode + 1)%5;
  }
  return timer;
}


// Here we change our JSONs to strings
var dataPacketUpJSON = JSON.stringify(dataPacketUp);
var dataPacketGoForwardJSON = JSON.stringify(dataPacketGoForward);
var dataPacketGoBackwardJSON = JSON.stringify(dataPacketGoBackward);
var dataPacketGoLeftJSON = JSON.stringify(dataPacketGoLeft);
var dataPacketGoRightJSON = JSON.stringify(dataPacketGoRight);
var dataPacketStopJSON = JSON.stringify(dataPacketSTOP);
var dataPacketChangeColorJSON = JSON.stringify(dataPacketChangeColor);
var dataPacketModeJSON = JSON.stringify(dataPacketModeButton);
var dataPacketArmUpJSON = JSON.stringify(dataPacketArmUp);
var dataPacketArmDownJSON = JSON.stringify(dataPacketArmDown);
var dataPacketPlierJSON = JSON.stringify(dataPacketPlier);
var dataPacketRightRotationBaseJSON = JSON.stringify(dataPacketRightRotationBase);
var dataPacketLeftRotationBaseJSON = JSON.stringify(dataPacketLeftRotationBase);
var dataPacketHeadUpJSON = JSON.stringify(dataPacketHeadUp);
var dataPacketHeadDownJSON = JSON.stringify(dataPacketHeadDown);


/* End of our message creation */

/* Methods for data gestion */
function controlRobot(data, sock, fs, mqttClient, request, setup) {
  console.log("here");
  //Global variable to know in which mode the hexapod is
  var mode = 0; 
  var array = data.toString().split(':');
  var robotControlled;
  var ipRobotControlled;
  var robotType;
  fs.readFile('database.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var arrayOfObjects = JSON.parse(data);
    for (var i = 0; i < arrayOfObjects.ipClients.length; i++) {
      console.log(arrayOfObjects.ipClients[i].address);
      if(sock.remoteAddress == arrayOfObjects.ipClients[i].address){
        robotControlled = arrayOfObjects.ipClients[i].robotSelected;
      }
    }
    for (var i = 0; i < arrayOfObjects.ipRobots.length; i++) {
      if(robotControlled == arrayOfObjects.ipRobots[i].robotName){
        ipRobotControlled = arrayOfObjects.ipRobots[i].ip;
        robotType = arrayOfObjects.ipRobots[i].robotType;
      }
    }
    console.log(ipRobotControlled+" "+robotType);
    if(robotType == 1){
      console.log('Control ' + array[1]);
      switch(array[1]) {
        case '0':
          mqttClient.publish(setup.tin, dataPacketStopJSON, {qos: setup.qos});
          break;
        case '1':
          console.log('avance');
          mqttClient.publish(setup.tin, dataPacketGoForwardJSON, {qos: setup.qos});
          break;
        case '2':
          mqttClient.publish(setup.tin, dataPacketGoBackwardJSON, {qos: setup.qos});
          break;
        case '3':
          mqttClient.publish(setup.tin, dataPacketGoLeftJSON, {qos: setup.qos});
          break;
        case '4':
          mqttClient.publish(setup.tin, dataPacketGoRightJSON, {qos: setup.qos});
          break;
        case '5':
          mqttClient.publish(setup.tin, dataPacketUpJSON, {qos: setup.qos});
          setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},1000);
          break;
        case '6':
          mqttClient.publish(setup.tin, dataPacketUpJSON, {qos: setup.qos});
          setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},1000);
          mqttClient.publish(setup.tin, dataPacketModeJSON, {qos: setup.qos});
          break;
        case '7':
          mqttClient.publish(setup.tin, dataPacketModeJSON, {qos: setup.qos});
          break;
        case '8':
            //Sit up
            var mode = 0;
            var timer = 0;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketUpJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            //Put its right front leg up
            timer = switchMode(3,mqttClient,setup,mode,timer);
            mode = 3;
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketGoForwardJSON, {qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,254,1,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,1,254,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            //Go Forward during 3 sec
            timer = switchMode(0,mqttClient,setup,mode,timer);
            mode = 0;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketGoForwardJSON,{qos: setup.qos});},timer);
            timer = timer + 2000;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            timer = timer + 2000;
            //Go right
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,128,254,0),{qos: setup.qos});},timer);
            timer = timer + 2000;
            //Go left
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,128,1,0),{qos: setup.qos});},timer);
            timer = timer + 2000;
            //Turn right
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,254,128,128,0),{qos: setup.qos});},timer);
            timer = timer + 2000;
            //Turn left
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,1,128,128,0),{qos: setup.qos});},timer);
            timer = timer + 2000;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            timer = switchMode(2,mqttClient,setup,mode,timer);
            mode = 2;
            //Swing
            //Go right
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,128,254,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            //Go left
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,128,128,1,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            //Turn right
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,254,128,128,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            //Turn left
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,1,128,128,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            //Combinations of both
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(1,128,128,254,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(255,128,128,1,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,254,1,128,0),{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(128,1,254,128,0),{qos: setup.qos});},timer);
            timer = timer + 5000;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            //Stand up as far as possible
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, hexapodMovement(1,128,128,128,0),{qos: setup.qos});},timer);
            timer = timer + 3000;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            timer = switchMode(0,mqttClient,setup,mode,timer);
            mode = 0;
            //Sit down
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketUpJSON,{qos: setup.qos});},timer);
            timer = timer + 500;
            setTimeout(function(){mqttClient.publish(setup.tin, dataPacketStopJSON,{qos: setup.qos});},timer);
            //end of the demo*/
          break;
		  case '9': 
			mqttClient.publish(setup.tin, dataPacketArmUpJSON, {qos: setup.qos});
		  break;
		  case '10':
			mqttClient.publish(setup.tin, dataPacketArmDownJSON, {qos: setup.qos});
		  break;
		  case '11':
			mqttClient.publish(setup.tin, dataPacketPlierJSON, {qos: setup.qos});
		  break;
		  case '12':
			mqttClient.publish(setup.tin, dataPacketRightRotationBaseJSON, {qos: setup.qos});
		  break;
		  case '13':
			mqttClient.publish(setup.tin, dataPacketLeftRotationBaseJSON, {qos: setup.qos});
		  break;
		  case '14': 
			mqttClient.publish(setup.tin, dataPacketHeadUpJSON, {qos: setup.qos});
		  break;
		  case '15':
			mqttClient.publish(setup.tin, dataPacketHeadDownJSON, {qos: setup.qos});
		  break;
        default:
          console.log("Not Implement yet!");
      }
    }else if(robotType == 0) {
      console.log('Control ' + robotControlled);
      request('http://'+ipRobotControlled+'/?action=['+array[1]+']', { json: false }, (err, res, body) => {
        if (err) { console.log(err); }
        console.log(body);
      });
    }
  });
}


function executeSequence(sock, data, fs, request) {
  var array = data.toString().split(':');
  if(array[1] != 'Sélectionnez une séquence...'){
    console.log('Execute Sequence on Robot: ' + array[1]);
    fs.readFile('database.json', 'utf-8', function(err, data) {
      if (err) throw err;
      var robotControlled;
      var ipRobotControlled;
      var robotType;
      var arrayOfObjects = JSON.parse(data);
      for (var i = 0; i < arrayOfObjects.ipClients.length; i++) {
        console.log(arrayOfObjects.ipClients[i].address);
        if(sock.remoteAddress == arrayOfObjects.ipClients[i].address){
          robotControlled = arrayOfObjects.ipClients[i].robotSelected;
        }
      }
      for (var i = 0; i < arrayOfObjects.ipRobots.length; i++) {
        if(robotControlled == arrayOfObjects.ipRobots[i].robotName){
          ipRobotControlled = arrayOfObjects.ipRobots[i].ip;
          robotType = arrayOfObjects.ipRobots[i].robotType;
        }
      }
      for (var i = 0; i < arrayOfObjects.sequences.length; i++) {
        if(arrayOfObjects.sequences[i].name == array[1]){
          var action = '[';
          for(var j = 0; j < arrayOfObjects.sequences[i].stations.length; j++){
            if(j == arrayOfObjects.sequences[i].stations.length-1){
              action += arrayOfObjects.sequences[i].stations[j];
            }else{
              action += arrayOfObjects.sequences[i].stations[j]+',';
            }
          }
          action += ']';
          console.log('Action sends: '+action);
          request('http://'+ipRobotControlled+'/?action='+action, { json: false }, (err, res, body) => {
            if (err) { console.log(err); }
            console.log(body);
          });
        }
      }
      fs.writeFileSync('database.json', JSON.stringify(arrayOfObjects,null,4));
    });
  }
}

function newSequence(sock, data, fs) {
  // TODO : Add sequence, receive like that: newSequence:name:true:1:2:3:0:1:0
  var array = data.toString().split(':');
  var nName = array[1];
  var nIsMain;
  if(array[2] == 'false'){
    nIsMain = false;
  } else {
    nIsMain = true;
  }
  var nActions = [];
  for (var i = 3; i < array.length; i++) {
    nActions.push(parseInt(array[i]));
  }
  var newSequence = {
    name: nName,
    stations: nActions,
    isMain: nIsMain
  };
  fs.readFile('database.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var arrayOfObjects = JSON.parse(data);
    if(nIsMain == true){
      for (var i = 0; i < arrayOfObjects.sequences.length; i++) {
        if(arrayOfObjects.sequences[i].isMain == true){
          arrayOfObjects.sequences[i].isMain = false;
        }
      }
    }
    arrayOfObjects.sequences.push(newSequence);
    fs.writeFileSync('database.json', JSON.stringify(arrayOfObjects,null,4));
  });
}

function sendSequences(sock, fs) {
  console.log("Asks for Sequences : ");
  fs.readFile('database.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var arrayOfObjects = JSON.parse(data);
    var arrayOfSequences = 'Sélectionnez une séquence.../';
    var idx = 0;
    for (var i = 0; i < arrayOfObjects.sequences.length; i++) {
      arrayOfSequences += arrayOfObjects.sequences[i].name + "/";
    }
    console.log(arrayOfSequences);
    sock.write(arrayOfSequences+'\n');
  });
}

function sendActionsForSequence(sock, data, fs) {
  console.log('Ask for sequence\'s actions ');
  var array = data.toString().split(':');
  fs.readFile('database.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var myActions = 'sequence/';
    var arrayOfObjects = JSON.parse(data);
    for (var i = 0; i < arrayOfObjects.sequences.length; i++) {
      if(arrayOfObjects.sequences[i].name == array[1]){
        for (var j = 0; j < arrayOfObjects.sequences[i].stations.length; j++) {
          myActions += arrayOfObjects.sequences[i].stations[j] + '/';
        }
      }
    }
    console.log(myActions);
    sock.write(myActions+'\n');
  });
}

function selectDefaultSequence(sock, data, fs) {
  var array = data.toString().split(':');
  if(array[1] != 'Sélectionnez une séquence...'){
    console.log('Modify main sequence');
    fs.readFile('database.json', 'utf-8', function(err, data) {
      if (err) throw err;
      var arrayOfObjects = JSON.parse(data);
      for (var i = 0; i < arrayOfObjects.sequences.length; i++) {
        if(arrayOfObjects.sequences[i].name != array[1] && arrayOfObjects.sequences[i].isMain == true){
          arrayOfObjects.sequences[i].isMain = false;
        }
        if(arrayOfObjects.sequences[i].name == array[1]){
          arrayOfObjects.sequences[i].isMain = true;
        }
      }
      fs.writeFileSync('database.json', JSON.stringify(arrayOfObjects,null,4));
    });
  }
}

function sendRobots(sock, data, fs) {
  console.log("Asks for Robots : ");
  fs.readFile('database.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var arrayOfObjects = JSON.parse(data);
    var arrayOfRobots = 'Sélectionnez un Robot.../';
    var idx = 0;
    for (var i = 0; i < arrayOfObjects.ipRobots.length; i++) {
      arrayOfRobots += arrayOfObjects.ipRobots[i].robotName + "/";
    }
    console.log(arrayOfRobots);
    sock.write(arrayOfRobots+'\n');
  });
}

function saveRobot(sock, data, fs) {
  var array = data.toString().split(':');
  console.log('Robot selected : ' + array[1]);
  if(array[1] != 'Sélectionnez un Robot...'){
    fs.readFile('database.json', 'utf-8', function(err, data) {
      if (err) throw err;
      var arrayOfObjects = JSON.parse(data);
      for (var i = 0; i < arrayOfObjects.ipClients.length; i++) {
        if(arrayOfObjects.ipClients[i].address == sock.remoteAddress){
          arrayOfObjects.ipClients[i].robotSelected = array[1];
        }
      }
      fs.writeFileSync('database.json', JSON.stringify(arrayOfObjects,null,4));
    });
  }
}
/* End Methods for data gestion */

module.exports.controlRobot = controlRobot;
module.exports.saveRobot = saveRobot;
module.exports.sendRobots = sendRobots;
module.exports.executeSequence = executeSequence;
module.exports.selectDefaultSequence = selectDefaultSequence;
module.exports.newSequence = newSequence;
module.exports.sendActionsForSequence = sendActionsForSequence;
module.exports.sendSequences = sendSequences;
