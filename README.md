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

Much of this setup requires some Linux chops. You will need to install Node.js, know when and how to use `sudo` when necessary, know how to determine locations to the nodejs executable, how to copy and edit files on the filesystem, etc.

1) Clone or copy the project to the Raspberry Pi.

2) Make a copy of `config/sample.json`. Save the file to an appropriate location. Update the configuration file with values for your environment.

3) Make a copy of `/init.d/cam-poster`. Save the file to `/etc/init.d/`.

4) Update the `PATH`, `NODE_PATH` and `HOME` variables in your new copy of `cam-poster`, and update the paths in the start and stop blocks.

5) Install the init script with `sudo update-rc.d cam-poster defaults`.

6) Install Node script dependencies.

	node install -g jsftp@1.5.3
	node install -g forever@0.15.1
	node install -g nconf@0.8.4

If the setup is correct, the applciation will start at boot. A photo will be captured, stored on the local filesystem and then uploaded to the remote server via FTP. The process will then be scheduled to start over in 60 seconds. Only the last ten images are saved.

To debug, view the forever log file. It is stored in `HOME/.forever`, where `HOME` is the directory specified in the `cam-poster` script.
