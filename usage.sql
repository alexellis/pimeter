select sum(kw_h) from energy nolock where energy_date between date('now','start of day') and date('now');
