import sqlite3 as sql

class db:
	def __init__(self, db_name):
		self.db_name=db_name

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
