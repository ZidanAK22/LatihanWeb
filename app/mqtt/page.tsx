// ./app/mqtt/page.tsx
"use client"

import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const DataPage: React.FC = () => {  
  const [data, setData] = useState<any[]>([]);
  const [temperature, setTemperature] = useState(0);
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
      mqttClient.subscribe("lele-dumbo-testing")            
    });
    
    mqttClient.on("reconnect", () => {
      console.log("reconnecting...")
    });

    mqttClient.on("message", (topic, message) => {
      console.log(message);
      const newData = JSON.parse(message.toString());

      setTemperature(parseFloat(newData));

      setData((prevData) => [...prevData, newData]);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    return () => {
      mqttClient.end()
    }

  }, []);

  return (
    <div>  
      <h2>Distance : {temperature} cm</h2>
      
      <h1>JSON Data from MQTT</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataPage;
