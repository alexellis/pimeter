# This utility can be used to compress recordings down into 1 row per minute.

import time
import sqlite3 as sql
from db import db

source = db('../energy.db')
compressed = db('./compress.energy.db')

# sqlite3 energy.compress.db < ../provision.sql

dates = source.get_dates()


for date in dates:
	print date[0]
	for hour in xrange(0,24):
		for minute in xrange(0,60):

			val=source.get_total_per_minute(date,hour,minute)
			if(val!=None and val[0]!=None):
				print "%s hour %d min %d total: %f" %( date[0], hour , minute, val[0])
				# print "total %f" % val[0]
				compressed.insert(date[0],hour,minute,float(val[0]))
			else:
				print "%s hour %d min %d" %(date[0], hour , minute)