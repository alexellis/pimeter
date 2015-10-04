# Use this utility to populate the database
# Change the variable 'device' if your arduino is not running at
# /dev/ttyAMA0

import serial
import sqlite3 as sql
from db import db

device = '/dev/ttyAMA0'
ser = serial.Serial(device, baudrate = 9600)

print ser.isOpen()
db1 = db('../energy.db')

while True:
        s = ser.readline()
        print s.rstrip()
        kw=float(1)/1000
        db1.write_energy(kw)
ser.close()
