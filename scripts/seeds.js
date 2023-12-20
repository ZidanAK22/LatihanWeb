const { db } = require('@vercel/postgres');
const {
  sensors
} = require('../app/lib/placeholder_data.js');

async function seedSensors(client) {
  try {    
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS sensors (
        id VARCHAR(6) PRIMARY KEY,
        turbidity INT NOT NULL,
        temperature FLOAT NOT NULL,
        volume FLOAT NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL
      );
    `;

    console.log(`Created "sensors" table`);

    // Insert data into the "users" table
    const insertedSensors = await Promise.all(
      sensors.map(async (sensor) => {
        return client.sql`
        INSERT INTO sensors (id, turbidity, temperature, volume, timestamp)
        VALUES (${sensor.id}, ${sensor.turbidity}, ${sensor.temperature}, ${sensor.volume}, ${sensor.timestamp})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedSensors.length} sensors`);

    return {
      createTable,
      sensors: insertedSensors,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
    const client = await db.connect();
  
    await seedSensors(client);
  
    await client.end();
}
  
main().catch((err) => {
console.error(
    'An error occurred while attempting to seed the database:',
    err,
    );
});