// ./app/mqtt/page.tsx
"use client"

import { useEffect, useState } from 'react';
import mqtt from 'mqtt';
import { ProgressRing } from 'progress-ring-component-react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts';
import { timeStamp } from 'console';

const DataPage: React.FC = () => {  
  const [data, setData] = useState<any[]>([]);
  const [temperature, setTemperature] = useState<any>(0);
  const [distance, setDistance] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [volume, setVolume] = useState(0);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [currentTimestamp, setCurrentTimestamp] = useState< String | null>();
  
  

  const brokerURI = "wss://broker.hivemq.com:8884/mqtt";
  const username = "leledumbo";
  const password = "";
  const clientOptions = {
    username,
    password,
    clientID: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
  };

  

  useEffect(() => {
      
    const mqttClient = mqtt.connect(brokerURI, clientOptions);  

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("lele-dumbo-temp")            
      mqttClient.subscribe("lele-dumbo-dis")            
      mqttClient.subscribe("lele-dumbo-turbd")            
    });
    
    mqttClient.on("reconnect", () => {
      console.log("reconnecting...")
    });

    mqttClient.on("message", (topic, message) => {
      console.log(message);
      const currentDate = new Date(Date.now()).toLocaleString();
      console.log(currentDate);
      setCurrentTimestamp(currentDate);
      if (topic === "lele-dumbo-temp") {      
        setTemperature(parseFloat(message.toString()));  
      };

      if (topic === "lele-dumbo-dis") {        
        setDistance(parseFloat(message.toString()));
      };
      
      if (topic === "lele-dumbo-turbd") {
        // const turbd = JSON.parse(message.toString());
        setTurbidity(parseFloat(message.toString()));
      };
      
      //     setSensorData(previousData => [
      //   ...previousData,
      //   { time: timestamp, value: temperature}
      // ])
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    return () => {
      mqttClient.end()
    }

  }, []);

  const degrees = (temperature);

  return (
    <div>        

      <div className="flex flex-row justify-evenly">
        {/* <LineChart width={400} height={400} data={sensorData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="name" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart> */}                
        <div>
          <ProgressRing percentage={degrees} invertColors={true}/>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <p>{`${temperature}°C`}</p>
          </div>
        </div>
        
        <div>
          <ProgressRing percentage={distance} />
          <br />
          <p>Ketinggian air : {distance} cm</p>
        </div>
        
        <div className="text-center">
          <ProgressRing percentage={turbidity} />
          <br/>
          <p>Turbidity</p>
        </div>
        
      </div>      
      {/* <h1>JSON Data from MQTT</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default DataPage;
