cam-poster
==========

Description
-----------

This project is a brutish script for the Raspberry Pi that periodically fires the camera and posts the resulting images via FTP to a remote server.

This is the first part of a quick-and-dirty "webcam" project. The other half of this project (TBD) displays the resulting images on a webpage.

There is a lot of manual setup, all of which is documented in this README.

Assumes Raspbian

Directory Structure
-------------------

### /config ###

Configurations can be stored here. The directory contains a sample configuration. Generally, a configuration would (and probably should) live outside the application.

### /images ###

Images captured by the camera can be stored here. Generally, images can be (and probably should), be stored outside the application.

### /init.d ###

Contains the init.d script used to start the app at boot.

### /src ###

Contains the Node.js application.

Setup
-----

1) Clone project
2) Create config, save to preferred location
3) Create directory to store images
4) Update init.d script
	copy to /etc/init.d
5) sudo npm install -g nconf...
	sudo npm install -g jsftp


If everything is working, monitor log at .forever...