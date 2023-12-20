import { fetchSensors } from "@/app/lib/data";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    const data = await fetchSensors()

    return NextResponse.json(data)
}

