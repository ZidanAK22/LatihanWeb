// pages/index.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const IndexPage: React.FC<{ initialData: any[] }> = ({ initialData }) => {
  const [data, setData] = useState<any[]>(initialData);

  useEffect(() => {
    const client = mqtt.connect(process.env.MQTT_BROKER!);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(process.env.MQTT_TOPIC!);
    });

    client.on('message', (_, message) => {
      const newData = JSON.parse(message.toString());
      setData((prevData) => [...prevData, newData]);
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>Data from MQTT</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link href="/data">
        <a>View JSON Data</a>
      </Link>
    </div>
  );
};

export default IndexPage;
