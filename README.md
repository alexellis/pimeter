# PiMeter

[![Build Status](https://travis-ci.org/alexellis/pimeter.svg?branch=master)](https://travis-ci.org/alexellis/pimeter)

## Smart energy usage meter for Raspberry PI

This project provides a daily and historical usage graph of energy consumption. This can then be used to indicate cost if this is of interest to you.

### Requirements
- An Arduino with LDR connected and USB cable
- A Raspberry PI
- An electric meter which has a blinking LED to indicate current consumption

### Installation on Arduino
- Open the arduino/flasher.ino sketch in the Arduino IDE
- Select your device and flash the code.
- Install LDR and signal LED to correct pins as per the sketch.

### Installation for Raspberry PI
- npm install bower -g
- npm install
- bower install
- node app - then navigate to http://localhost/
- Initialize the empty energy DB with the following command: `sqlite3 energy.db < provision.sql`

### Running the software
- Flash your Arduino with the software and attach its LDR to the blinking LED on your energy meter.
- On boot-up start the `meter/meter.py` program. This will then start logging data from the Arduino.

I have run this system at my own house for several months and have had no issues to speak of. It has been interesting to monitor the usage of various appliances and what causes a peak and what my daily usage is like.

### Disclaimer of Warranty.
THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
