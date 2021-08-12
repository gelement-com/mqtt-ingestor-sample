let apiKey = "941908ba3f5de353";
let secretKey = "268a4653-d0f6f15f-1cb02053-6a18fc62-95b754f5-cd7f47b2-80a7cddb-05b69b9c";
let mqttHostname = "mqtt.senfi.io";
let mqttPort = 1883;

let apiMajorVersion = 1;
let apiMinorVersion = 0;
let dataType = "live"; // live | backlog
let encoding = "text"; // text | gzip
let formatType = "array"; // array | normalized
let namespace = "ems";
let measurement = "ge_temp_v1";

// topic = `ingestor/1/0/live/text/array/ems/941908ba3f5de353/ge_temp_v1`;
let topic = `ingestor/${apiMajorVersion}/${apiMinorVersion}/${dataType}/${encoding}/${formatType}/${namespace}/${apiKey}/${measurement}`;

let message = {
	data: [
		{
			tm_source: new Date().getTime(),
			lsid: "KCAY-AWK",
			country: "SG",
			temp: 50
		},
		{
			tm_source: new Date().getTime(),
			lsid: "EDVA-HJB",
			country: "SG",
			temp: 60
		}
	]
};

const mqtt = require("mqtt");

//Connects to MQTT Server
let mqttClient = mqtt.connect({
	username: apiKey,
	password: secretKey,
	host: mqttHostname,
	port: mqttPort,
	clean: true
});

mqttClient.on("connect", function () {
	//publish data to MQTT Server
	mqttClient.publish(topic, JSON.stringify(message), { qos: 2 }, function (err) {
		if (err) console.log("error publishing data. Error:", err);
		else console.log("measurement data published");

		mqttClient.end();
	});
});
mqttClient.on("error", function (err) {
	console.log("MQTT encountered error. Exiting application.... \n Error:", err);
});
