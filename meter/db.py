import sqlite3 as sql
import sys

class db:
	def __init__(self, db_name):
		self.db_name=db_name
	def pad(self, st):
		if len(str(st))==1:
			return "0"+str(st)
		return str(st)

	def insert(self,date,hour,minute,kwh):
		try:
			con = sql.connect(self.db_name)
			cur = con.cursor()
			time_string=self.pad(hour)+":"+self.pad(minute)+":00"

			cur.execute("insert into energy (log_id,kw_h,energy_date,energy_time) values (?,?,?,?)",[None,kwh,date,time_string])
			con.commit()
		except sql.Error, e:
			print e
			sys.exit(1)
		finally:
			if con:
				con.close()

	def get_total_per_minute(self,date,hour,minute):
		time_string=self.pad(hour)+":"+self.pad(minute)+":00"
		full_time_string=self.pad(hour)+":"+self.pad(minute)+":59"
		query= "select sum(kw_h) from energy where energy_date='"+str(date[0])+"' "+\
			"and energy_time between '"+time_string+"' and '"+full_time_string+"';"
		#print query
		try:
			con = sql.connect(self.db_name)
			cur = con.cursor()

			cur.execute(query);
			rows =cur.fetchone();
			return rows

		except sql.Error, e:
			print e
			sys.exit(1)
		finally:
			if con:
				con.close()


	def get_dates(self):
		try:
			con = sql.connect(self.db_name)
			cur = con.cursor()

			cur.execute("select distinct energy_date from energy order by energy_date desc;");
			rows =cur.fetchall();
			return rows

		except sql.Error, e:
			print e
			sys.exit(1)
		finally:
			if con:
				con.close()

	def write_energy(self,kwh):
		try:
			con = sql.connect(self.db_name)
			cur = con.cursor()

			cur.execute("select log_id, kw_h from energy where energy_date=date('now') and energy_time=strftime('%H:%M:00',time('now')) limit 1;");
			data = cur.fetchone();

			if data is not None:
				print "Updating minute"
				log_id = data[0]
				total = float(data[1])+kwh
				cur.execute("update energy set kw_h='"+str(total)+"' where log_id='"+str(log_id)+"'")
			else:
				print "Inserting minute"
				cur.execute("insert into energy values (?,?,date(),strftime('%H:%M:00',time('now')))",[None,kwh])

			con.commit()
		except sql.Error, e:
			print e
			sys.exit(1)
		finally:
			if con:
				con.close()
