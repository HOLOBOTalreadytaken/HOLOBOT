import couleur

import os
import zmq
import time
from copy import deepcopy
from matrix_io.proto.malos.v1 import driver_pb2
from matrix_io.proto.malos.v1 import io_pb2

from multiprocessing import Process
from zmq.eventloop import ioloop

#from utils import register_error_callback

import random

# or local ip of MATRIX creator
creator_ip = os.environ.get('CREATOR_IP', '127.0.0.1')

# port for everloop driver
creator_everloop_base_port = 20013 + 8

#----------------------------------------------------------------------------------#
# pour envoyer l'image a la matrix

def send_image(image) :
    
    """Sets all of the LEDS to a given rgbw value"""

    # grab zmq context
    context = zmq.Context()

    # get socket for config
    config_socket = context.socket(zmq.PUSH)
    config_socket.connect('tcp://{0}:{1}'.format(creator_ip, creator_everloop_base_port))

    # create a new driver config strut
    config = driver_pb2.DriverConfig()
    # add the "image" to the config driver
    config.image.led.extend(image)

    # send a serialized string of the driver config
    # to the config socket
    config_socket.send(config.SerializeToString())
    
    return image

#----------------------------------------------------------------------------------#
# On definit les animations

def clignote(image,n):
    
    for i in range(0,n):
        send_image(couleur.off())
        time.sleep(0.5)
        send_image(image)
        time.sleep(0.5)
    return 1


def tourne(image,n):

    send_image(image)
    for i in range (n):
        image.append(image[0])
        image=image[1:36]
        time.sleep(3/(i+1))
        send_image(image)
    return 1


def pulsation(image,n):
    tmp = deepcopy(image)

    for j in range(0,n):
        while(image[1].red!=0 or image[1].green!=0 or image[1].blue!=0 or image[1].white!=0):
            for i in range(35):
                
                if(image[i].red):
                    image[i].red-=1
                    
                if(image[i].green):
                    image[i].green-=1
                    
                if(image[i].blue):
                    image[i].blue-=1
                    
                if(image[i].white):
                    image[i].white-=1
                    
            time.sleep(0.01)        
            send_image(image)
            
        image = deepcopy(tmp)
        
        time.sleep(0.3)
        send_image(image)
    return 1


def spirale(image,n):
    tmp=deepcopy(image)
    send_image(image)
    time.sleep(0.2)
    
    for i in range(0,n):
        for j in range(35):
            time.sleep(0.2)
            image[j].red = 0
            image[j].green = 0
            image[j].blue = 0
            image[j].white = 0
            send_image(image)
            
            
        image = deepcopy(tmp)
        time.sleep(0.2)
    return 1


def volet(image,n):
    tmp=deepcopy(image)
    send_image(image)
    time.sleep(0.2)
    
    for i in range(0,n):
        for j in range(35):
            time.sleep(0.2)
            image[j].red = 0
            image[j].green = 0
            image[j].blue = 0
            image[j].white = 0

            image[34-j].red = 0
            image[34-j].green = 0
            image[34-j].blue = 0
            image[34-j].white = 0
            
            send_image(image)
              
        image = deepcopy(tmp)
    return 1

def volet_inverse(image,n):
    tmp=deepcopy(image)
    send_image(image)
    time.sleep(0.2)
    
    for j in range(int(34*n/100)):
        time.sleep(0.2)

        image[j].red = 50
        image[j].green = 50
        image[j].blue = 50
        image[j].white = 50

        image[34-j].red = 50
        image[34-j].green = 50
        image[34-j].blue = 50
        image[34-j].white = 50
            
        send_image(image)
              
        image = deepcopy(tmp)
        
    return 1
