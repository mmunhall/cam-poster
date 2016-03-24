cam-poster
==========

Description
-----------

This project is a brutish script for the Raspberry Pi that periodically fires the Pi camera and posts the resulting images via FTP to a remote server. This is the first part of a quick-and-dirty "webcam" project. The other half of this project (TBD) displays the resulting images on a webpage.

This assumes Raspbian, but should work on other Debian derivatives.

There is a lot of manual setup, all of which is documented in this README.

Directory Structure
-------------------

### /config ###

Configurations can be stored here. The directory contains a sample configuration. Generally, a configuration would (and probably should) live outside the application.

### /images ###

Images captured by the camera can be stored here. Generally, images can (and probably should) be stored outside the application.

### /init.d ###

Contains a sample init.d script used to start the app at boot.

### /src ###

Contains the Node.js application.

Setup
-----

1) Clone or copy the project to the Raspberry Pi.

2) Make a copy of `config/sample.json`. Save the file to an appropriate location. Update the configuration file with values for your envirnoment.

3) Make a copy of `/init.d/cam-poster`. Save the file to `/etc/init.d/`.

4) Update the `PATH`, `NODE_PATH` and `HOME` variables in your new copy of `cam-poster`.

5) sudo npm install forever@0.15.1
	sudo npm install -g nconf...
	sudo npm install -g jsftp


If everything is working, monitor log at .forever...