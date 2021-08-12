// import mqtt package
const mqtt = require("mqtt");

// Fill in the integration and secret key from Senfi
const apiKey = "<your integration key>";
const secretKey = "<your secret key>";

// Values that must be provided
const apiMajorVersion = 2;
const apiMinorVersion = 0;
const dataType = "live"; // live | backlog
const encoding = "text"; // text | gzip
const formatType = "array"; // array | normalized
const mqttHostname = "mqtt.senfi.io";
const mqttPort = 1883;

// Fill in the measurement code
const measurementCode = "<your measurement code>"; // Obtained after creating a measurement in Senfi. Example - sensor_v1

// Example topic - `ingestor/2/0/live/text/array/941908ba3f5de353/ge_temp_v1`;
const topic = `ingestor/${apiMajorVersion}/${apiMinorVersion}/${dataType}/${encoding}/${formatType}/${apiKey}/${measurementCode}`;

// Sample data. Data should be obtained from a device before formatting to json and send to Senfi
let message = {
	data: [
		{
			tm_source: new Date().getTime(),
			site_id: 0,
			// Example tags
			sensor_id: 0,
			country: "SG",

			// Example metrics
			temperature: 19,
			humidity: 90,
			dust: 10,
			voc: 19,
			co2: 44,
			co: 30,
			pressure: 1008,
			ozone: 8
		}
	]
};

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
