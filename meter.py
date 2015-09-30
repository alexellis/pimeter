# Deprecated. See utility 'meter.py' within the folder: ./meter/

# import serial
# import sqlite3 as sql

# def write_energy(kwh):
# 	try:
# 		con = sql.connect('energy.db')
# 		cur=con.cursor()
# 		cur.execute("insert into energy values (?,?,date(),time())",[None,kwh])
# 		con.commit()
# 	except sql.Error, e:
# 		print e
# 		sys.exit(1)
# 	finally:
# 		if con:
# 			con.close()

# ser = serial.Serial('/dev/ttyAMA0',baudrate=9600)

# #ser.baudrate = 9600

# #ser.open()

# print ser.isOpen()

# while True:
# 	s= ser.readline()
# 	print s.rstrip()
# 	kw=float(1)/1000
# 	write_energy(kw)

# ser.close()

