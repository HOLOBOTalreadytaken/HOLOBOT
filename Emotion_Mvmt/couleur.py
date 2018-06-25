import os
import zmq
import time
from matrix_io.proto.malos.v1 import driver_pb2
from matrix_io.proto.malos.v1 import io_pb2

from multiprocessing import Process
from zmq.eventloop import ioloop

#from utils import register_error_callback

def rouge(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = intensity
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)
        
    
    return image


def vert(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = intensity
        ledValue.white = 0
        image.append(ledValue)
    
    return image


def bleu(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = intensity
        ledValue.red = 0
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)
    
    return image


def blanc(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = 0
        ledValue.white = intensity
        image.append(ledValue)
    
    return image


def orange(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = intensity
        ledValue.green = intensity-15
        ledValue.white = 0
        image.append(ledValue)
        
    print(image[0].red)
    return image


def jaune(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = intensity
        ledValue.green = int(intensity/1.5)
        ledValue.white = 0
        image.append(ledValue)
    
    return image


def violet(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = int(intensity/1.5)
        ledValue.red = intensity
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)
    
    return image

def test(intensity):
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(0,33,2):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)

        
        led =led+1
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)

    led=34
    ledValue = io_pb2.LedValue()
    ledValue.blue = 0
    ledValue.red = intensity
    ledValue.green = 0
    ledValue.white = 0
    image.append(ledValue)  
    return image

def off():
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = 0
        ledValue.white = 0
        image.append(ledValue)
    
    return image


def R2D2():
    intensity = 25
    # initialize an empty list for the "image" or LEDS
    image = []

    # iterate over all 35 LEDS and set the rgbw value of each
    # then append it to the end of the list/image thing
    
    for led in range(35):
        ledValue = io_pb2.LedValue()
        ledValue.white = intensity
        ledValue.blue = 0
        ledValue.red = 0
        ledValue.green = 0
        
    led=13
    ledValue.red = intensity
  
    led=11
    ledValue.blue=intensity
    led=12
    ledValue.blue=intensity
    led=14
    ledValue.blue=intensity
    led=15
    ledValue.blue=intensity
    led=23
    ledValue.blue=intensity

    led=30
    ledValue.blue=intensity

    led=1
    ledValue.blue=intensity
    led=2
    ledValue.blue=intensity
    led=3
    ledValue.blue=intensity
    led=4
    ledValue.blue=intensity
    image.append(ledValue)
    return image
    



    
