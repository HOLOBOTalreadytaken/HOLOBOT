from __future__ import print_function
import pyzbar.pyzbar as pyzbar
import numpy as np
import cv2
from picamera import PiCamera
from matrix_io.proto.malos.v1 import driver_pb2
from matrix_io.proto.malos.v1 import io_pb2

#from utils import register_error_callback
#import pyzbar

import os
import time
import couleur
import effet
import traitement
import commande
import serial

import paho.mqtt.client as mqtt 
import time



from multiprocessing import Process
from zmq.eventloop import ioloop

ser = serial.Serial('/dev/ttyACM0', 9600)


# or local ip of MATRIX creator
creator_ip = os.environ.get('CREATOR_IP', '127.0.0.1')

# port for everloop driver
creator_everloop_base_port = 20013 + 8

def led_error_callback(error):
    """This just captrues an error and prints it to stdout"""
    print('{0}'.format(error))

def is_int(var):
    try:
        int(var)
    except:
        return -1
    
def argument(chaine):
    i = 0
    while (is_int(chaine[i])!= -1):
        i+=1

    return int(chaine[0:i])

def create_instruction(step,mot,instruction):

    if(step.find(mot) != -1):
            
            pos=step.find(mot)+len(mot)
            if(mot in move_robot_qr):
                mot=move_robot_mqtt[move_robot_qr.index(mot)]
            if(mot in move_robot_qr):
                mot=move_robot_mqtt[move_robot_qr.index(mot)] #replace by the mqtt tram
            instruction.append([mot,argument(step[pos+1:pos+4])])
            if(mot in move_robot_mqtt):
                mot=move_robot_qr[move_robot_mqtt.index(mot)]
            step.replace(mot,'') #delete

def on_connect(client, userdata, flags, rc):
	print('connected (%s)' % client._client_id)
	client.subscribe(topic='robot/in', qos=2)

forward_message = '{"receiver":"HEXAPOD_ID","sender":"HOLOLENS_ID","body_message":{"func":"hexapodGoForward","parameters":{"V_right_joystick":128,"H_right_joystick":128,"V_left_joystick":254,"H_left_joystick":128,"buttons":0}}}'
stop_message = '{"receiver":"HEXAPOD_ID","sender":"HOLOLENS_ID","body_message":{"func":"hexapodStop","parameters":{"V_right_joystick":128,"H_right_joystick":128,"V_left_joystick":128,"H_left_joystick":128,"buttons":0}}}'
right_message = '{"receiver":"HEXAPOD_ID","sender":"HOLOLENS_ID","body_message":{"func":"hexapodGoRight","parameters":{"V_right_joystick":128,"H_right_joystick":254,"V_left_joystick":128,"H_left_joystick":128,"buttons":0}}}'
left_message = '{"receiver":"HEXAPOD_ID","sender":"HOLOLENS_ID","body_message":{"func":"hexapodGoLeft","parameters":{"V_right_joystick":128,"H_right_joystick":1,"V_left_joystick":128,"H_left_joystick":128,"buttons":0}}}'
backward_message = '{"receiver":"HEXAPOD_ID","sender":"HOLOLENS_ID","body_message":{"func":"hexapodGoBackward","parameters":{"V_right_joystick":128,"H_right_joystick":128,"V_left_joystick":1,"H_left_joystick":128,"buttons":0}}}'

couleur_dispo=['rouge','bleu','vert','orange','violet','blanc','off']
effet_dispo=['clignotte','tourne','spiral','pulsation','volet','blanc']
move_robot_qr=['avance','recule','droite','gauche','stop']
move_robot_mqtt=[forward_message,backward_message,right_message,left_message,stop_message] #Attention : penser a faire correspondre les positions des instruction QR et MQTT
move_head=['penche','tourne','rotation_h','monte','pince']



 
'''-----------------initialisation--------------------------'''
camera = PiCamera()
camera.resolution = (1024, 768)
ioloop.install()

# Note : attention au changement IP broker	
broker_address = "192.168.0.11"

print("Creating new instance of client Mqtt")
client = mqtt.Client("Raspebbry Matrix")
client.on_connect = on_connect
# connecting to the broker 
print("Connecting to the broker")
client.connect(broker_address)


if __name__ == '__main__':

    photo=1

    while True :
        camera.capture('zbar-test.jpg')
        im=cv2.imread('zbar-test.jpg')
        print("Image "+str(photo))
        photo += 1
        tram=traitement.decode(im)

        if(len(tram)==1):
            tram=tram[0][1]
            tram=tram.decode('utf-8')
            
        #tram='rouge(12),clignotte(4),penche(2),avance(5)/delay(4)/recule(8),bleu(40),spiral(1)'
        #tram='bleu(20),clignotte(4),penche(5)/rouge(15),volet(3),pince(1)/off(2)'
        tram='vert(30),volet(1),avance(3),penche(4)/delay(2)'	
	
        if(len(tram)>0):
            tram=tram.split('/')
            
        instruction=[]
        for step in tram :

            etape=[]
            for color in couleur_dispo :
                create_instruction(step,color,etape)

            for effect in effet_dispo:
                create_instruction(step,effect,etape)

            for mouvement in move_robot_qr :
                create_instruction(step,mouvement,etape)


            for mouvement in move_head :
                create_instruction(step,mouvement,etape) 
            create_instruction(step,'delay',etape)


            instruction.append(etape)
            
        
        print(instruction)
        for etape in instruction :
            #track led information
            couleurled,effetled='0','0'
            deplacement,argdeplacement='0','0'
            mouvement,angle='0','0'

            for fonction in etape :
                if(fonction[0] in couleur_dispo):
                    couleurled=fonction[0]
                    argcouleur=fonction[1]

                if(fonction[0] in effet_dispo):
                    effetled=fonction[0]
                    argeffet=fonction[1]
            #if color and animation find
            if(couleurled != '0' and effetled != '0'):
                #create commande for matrice
                commande_matrix='effet.'+str(effetled)+'(couleur.'+str(couleurled)+'('+str(argcouleur)+'),'+str(argeffet)+')'
                print(commande_matrix)
                #and send
                eval(commande_matrix)

            

            for fonction in etape :
                if(fonction[0] in move_head):
                    mouvement,angle=fonction[0],fonction[1]

            if(mouvement!= '0' and angle!='0'):
                commande_servo='commande.'+str(mouvement)+'('+str(angle)+')'
                print(commande_servo)
                eval(commande_servo)

            for fonction in etape :
                if(fonction[0] in move_robot_mqtt):
                    deplacement,argdeplacement=fonction[0],fonction[1]

            if(deplacement != '0' and argdeplacement != '0'):
                client.publish("robot/in",deplacement)
                time.sleep(argdeplacement)
                client.publish("robot/in",stop_message)
 
            for fonction in etape :
                if(fonction[0]=='delay'):
                    time.sleep(fonction[1])

                    
        print('fin')
        time.sleep(2)
            

'''
	photo=1

	while True :
		camera.capture('zbar-test.jpg')
		im = cv2.imread('zbar-test.jpg')
		print("Image "+str(photo))
		photo = photo+1
		tram=traitement.decode(im)

		if(len(tram)==1):
                    tram=tram[0][1]
                    tram=tram.decode('utf-8')

	tram='rouge(12),clignotte(41),penche(2),avance(5)/delay(4)/recule(8)' #for test tram function without QR code
	tram=tram.split('/')
	instruction=[]

	for step in tram :

		etape=[]
	    	#tracking of key-words


	    	#first the color
		couleur_dispo=['rouge','bleu','vert','orange','violet','blanc']
		#Then the effect
		effet_dispo=['clignotte','tourne','spiral','pulsation','violet','blanc']
	    	#And Movement
		move=['avance','recule']

		for color in couleur_dispo :
			creat_instruction(step,color,etape)

		for effect in effet_dispo:
			creat_instruction(step,effect,etape)

		for mouvement in move :
			creat_instruction(step,mouvement,etape)

		creat_instruction(step,'delay',etape)
		instruction.append(etape)
		#create_instruction(step,'rouge',etape)
            	#create_instruction(step,'clignotte',etape)
            	#create_instruction(step,'penche',etape)
            	#create_instruction(step,'avance',etape)
            	#create_instruction(step,'delay',etape)
            	#create_instruction(step,'recule',etape)
		#instruction.append(etape)
		#print(instruction)

'''
