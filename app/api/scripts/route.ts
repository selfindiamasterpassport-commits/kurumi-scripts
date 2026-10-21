import { NextResponse } from "next/server";
import { getScriptsData } from "@/lib/scripts";

export async function GET() {
  try {
    const data = await getScriptsData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/scripts:", error);
    return NextResponse.json(
      { error: "Failed to load scripts" },
      { status: 500 }
    );
  }
}
