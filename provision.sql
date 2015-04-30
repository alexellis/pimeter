create table energy(
log_id INTEGER PRIMARY KEY,
kw_h float,
energy_date date,
energy_time time
);

create index energy_date on energy (energy_date desc);
