import serial
import sqlite3 as sql
from db import db

ser = serial.Serial('/dev/ttyAMA0',baudrate=9600)

print ser.isOpen()

while True:
        s = ser.readline()
        print s.rstrip()
        kw=float(1)/1000
        db1.write_energy(kw)

ser.close()
