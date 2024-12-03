import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log("Received data:", data);

  return new Response(JSON.stringify({ message: "Data received" }), {
    headers: { "Content-Type": "application/json" },
  });
}
