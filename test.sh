#!/bin/sh
curl -X POST -H 'Content-type: application/json' -d '{"name":"alex","uptime" :"2 days 5 minutes 5 hours 00.01 02.32 avg"}' http://localhost:8000/api/checkin