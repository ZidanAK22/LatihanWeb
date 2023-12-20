import { sql } from '@vercel/postgres';
import { Sensors } from './definitions';

export async function fetchSensors() {
    try {
        const data = await sql<Sensors>`SELECT * FROM Sensors`;

        return data.rows;
    } catch (error) {
        console.error('Database error: ', error)
        throw new Error('Failed to fetch sensors data');
    }
}

export async function fetchSensorsTemperature() {
    try {
        const data = await sql<Sensors>`SELECT temperature FROM Sensors`;

        return data.rows;
    } catch (error) {
        console.error('Database error: ', error)
        throw new Error('Failed to fetch sensors data');
    }
}
