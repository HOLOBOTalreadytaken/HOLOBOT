import paho.mqtt.client as mqtt #import the client1 import time import serial import commande
import serial
import time
import commande
############
def on_message(client, userdata, message):
    plier_message ='{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"Plier","parameters":{"P_joystick":1}}}'
    arm_up= '{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"ArmUp","parameters":{"A_joystick":1}}}'
    arm_down = '{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"ArmDown","parameters":{"A_joystick":1}}}'
    left_rotation_message = '{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"LeftRotation","parameters":{"B_joystick":1}}}'
    right_rotation_message ='{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"RightRotation","parameters":{"B_joystick":1}}}'
    head_up= '{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"HeadUp","parameters":{"H_joystick":1}}}'
    head_down = '{"receiver":"MATRIX_ID","sender":"HOLOLENS_ID","body_message":{"func":"HeadDown","parameters":{"H_joystick":1}}}'


    commande_recu=[plier_message,arm_up,arm_down,right_rotation_message,left_rotation_message,head_up,head_down]
    commande_servo=['pince','monte','descend','rotation_droite','rotation_gauche','penche_haut','penche_bas']
    #print("message received " ,str(message.payload.decode("utf-8")))
    #print("message topic=",message.topic)
    #print("message qos=",message.qos)
    #print("message retain flag=",message.retain)
    print(str(message.payload.decode("utf-8")))
    tram=str(message.payload.decode("utf-8"))
    if(tram in commande_recu):
	print(eval('commande.'+commande_servo[commande_recu.index(tram)]+'(10)'))

########################################
broker_address="192.168.0.11"
#broker_address="iot.eclipse.org"
print("creating new instance")
client = mqtt.Client("P1") #create new instance
client.on_message=on_message #attach function to callback
print("connecting to broker")
client.connect(broker_address) #connect to broker
client.loop_start() #start the loop
print("Subscribing to topic","matrice")
i=0
print(client.subscribe("robot/in"))
client.subscribe("robot/in")
#client.subscribe("robot/in")
#print("Publishing message to topic","python/test")
#client.publish("python/test","OFF")
time.sleep(40000) # wait
client.loop_stop() #stop the loop
