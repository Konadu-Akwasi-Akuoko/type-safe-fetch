import quotes from "@/db.json";
import { NextResponse } from "next/server";

// This is also not type safe, how can we know the type of the incoming request?
// We intend to response with the endpoint, method, body and data. Where body
// is the body of the request if we received any, and data is the quotes from
// `@/db.json`
export async function GET(request: Request) {
  console.log(request);
  return NextResponse.json({
    endpoint: "quotes",
    method: request.method,
    body: request.body,
    data: quotes,
  });
}
