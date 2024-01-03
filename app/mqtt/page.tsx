// ./app/mqtt/page.tsx
'use client'

import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const DataPage: React.FC = () => {  
  const [data, setData] = useState<any[]>([]);
  const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");  

  useEffect(() => {
    
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
      setData((prevData) => [...prevData, newData]);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    return () => {
      mqttClient.end()
    }

  }, [data]);

  return (
    <div>
      <h1>JSON Data from MQTT</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataPage;
