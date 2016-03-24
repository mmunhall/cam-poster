var JsFtp = require('jsftp'),
	fs = require('fs'),
	nconf = require('nconf'),
	exec = require('child_process').exec,
	counter = 0;

configure();
init();

function configure() {
	console.log("configure");
	var file;
	if (process.argv.length < 3) {
	 	console.log("Configuration file must be specifed as the first argument.");
		process.exit;
	}
	file = process.argv[2];
	if (!fs.existsSync(file)) {
		console.log("Configuration file does not exist.");
		process.exit;
	}
	nconf.use('memory');
	nconf.file({ file: process.argv[2] });
}

function init() {
	console.log('init');
	makeDirectory();
	capture();
}

function makeDirectory() {
	console.log('makeDirectory');
	if (!fs.existsSync(nconf.get("localImages:directory"))) {
	    fs.mkdirSync(nconf.get("localImages:directory"));
	}
}

function capture() {
	console.log('capture: ' + counter);
	exec("raspistill --width 800 --height 600 -o " + getImageLocalPath(), onCapture);
}

function onCapture(error, stdout, stderror) {
	console.log('onCapture: ' + counter);
	if (error !== null) {
		console.log("error: " + error);
		console.log("stderror: " + stderror);
		// TODO: Recover (restart in 10 minutes?)
	} else {
		put();
	}
}

function put() {
	console.log('put: ' + counter);
	var ftp = new JsFtp({
	  host: nconf.get("ftp:host"),
	  port: nconf.get("ftp:port"),
	  user: nconf.get("ftp:username"),
	  pass: nconf.get("ftp:password"),
	  debugMode: nconf.get("ftp:debug")
	});

	ftp.on('jsftp_debug', function(eventType, data) {
	  console.log('DEBUG: ', eventType);
	  console.log(JSON.stringify(data, null, 2));
	});
	
	ftp.put(getImageLocalPath(), nconf.get("ftp:directory") + getImageName(), function(err) {
		if (err) {
			// TODO: Recover
			console.log("put err: " + err);
			ftp.raw.quit();
		} else {
			ftp.raw.quit();
			setCounter();
	    	setTimeout(capture, 60000);
	    }
	});
}

function setCounter() {
	console.log('setCounter: ' + counter);
	if (counter == 9) {
		counter = 0;
	} else {
		counter = counter + 1;
	}
}

function getImageName() {
	return "img" + counter + ".jpg";
}

function getImageLocalPath() {
	return nconf.get("localImages:directory") + getImageName();
}
