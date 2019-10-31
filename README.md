# mqtt-ingestor-sample

Sample application to send data to the MQTT Ingestor via the MQTT Broker

# Prerequisites
- NPM 6.4.1 or newer
- NodeJS 10.15.1 or newer

# Clone & Setup
1. Clone this repository
2. Run ```npm install``` in directory where you've cloned the respository
3. Run one of the sample by following instructions below

# Sample 1
Sample 1 sends Uncompressed Live data in the array format.


```
Data Type: Live
Data Encoding: Uncompressed Text
Format: Array
```

## Run the sample
1. Before running the sample, configure the script to use your api-key and secret.
   * Go to <https://ems.senfi.io/cms/developer> to get your ```apiKey``` and ```secretKey```
   * Replace ```apiKey``` and ```secretKey``` on Line 1 and Line 2 of [sample1/publish.js](sample1/publish.js)
2. Configure which measurement to send data to
   * Go to <https://ems.senfi.io/cms/measurement> to get ```Measurement Code```
   * Replace ```measurement``` on Line 6 of [sample1/publish.js](sample1/publish.js) with desired ```Measurement Code```
3. Configure metric data
   * Metric data is configured from Line 17 to 32 of [sample1/publish.js](sample1/publish.js)
   * Each object in ```message.data``` array represents a ```measurement-reading``` of all metrics in the measurement
   * Each ```measurement-reading``` in the sample consists of the following key - value pairs
  
     | Key           | Value                                       | Remarks  |
     | ------------- | -------------                               | ----- |
     | tm_source     | UNIX timestamp in milliseconds              | Time when the reading was taken |
     | lsid          | Tag - ID of lift where reading is from      | |
     | country       | Tag - Code of the country that lift is in   | |
     | temp          | Read value of the ```temp``` metric         | Key is the ```Metric Code``` from <https://ems.senfi.io/cms/measurement/<measurement_code>> |
    
4. Run the script to send data
   * ```npm run sample1```



