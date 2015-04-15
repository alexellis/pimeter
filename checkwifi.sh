ping -c4 192.168.0.1 > /dev/null

if [ $? != 0 ] 
then
  echo "No network connection, restarting wlan0"
  ifconfig wlan0 down
  sleep 5
  ifconfig wlan0 up
fi

