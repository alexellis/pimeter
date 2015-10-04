import time
import sqlite3 as sql
from db import db

db1 = db('energy_test.db')
while True:
        kw=float(1)/1000
        db1.write_energy(kw)
        time.sleep(0.07)
