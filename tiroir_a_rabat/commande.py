import serial
ser = serial.Serial('/dev/ttyACM0', 9600)


def commande_servo(m):
    #m=bytes(m, 'utf-8')
    
    
    if(isint(m)):
        ser.write(m)
    print('le message ')

    #Lancement R2D2
    if(str(m)=='R2D2'):
        for i in range (5):
            rdm1 =random.randint(5,20)
            rdm2 =random.randint(5,20)
            for i in range (rdm1):
                time.sleep(0.05)
                ser.write(b'1')
            for i in range (rdm2):
                time.sleep(0.05)
                ser.write(b'2')
                ser.write(b'3')
        
        print(ser.read())



def lecture(ser):
    return ser.read()

def penche_bas(a):
    for i in range(abs(a)):
        if(a==0):
            ser.write(b'3')
        
        else:
           ser.write(b'1')
    #return 1
           
def penche_haut(a):
    for i in range(abs(a)):
        if(a==0):
            ser.write(b'3')
        
        else:
           ser.write(b'2')
    #return 1

                      
def rotation_droite(a):
    for i in range(abs(a)):        
        if(a==0):
            ser.write(b'6')
        else:
            ser.write(b'4')
    return 1

def rotation_gauche(a):
    for i in range(abs(a)):        
        if(a==0):
            ser.write(b'6')
        else:
            ser.write(b'5')
    return 1

def monte(a):
    for i in range(abs(a)):
        if(a==0):
            while(ser.read()==0):
                ser.write(b'7')
        else:
            ser.write(b'7')
    return 1

def descend(a):
    for i in range(abs(a)):
        if(a==0):
            while(ser.read()==0):
                ser.write(b'7')
        else:
            ser.write(b'8')
    return 1

def pince(a):
    ser.write(b'9')
    
        
       
