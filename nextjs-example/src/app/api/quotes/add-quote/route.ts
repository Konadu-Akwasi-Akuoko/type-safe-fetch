import { NextResponse } from "next/server";

// This is also not type safe, how can we know the type of the incoming request?
// We intend to response with the endpoint, method, body and data. Where body
// is the body of the request if we received any, and data would be the body we
// would return again minus any property that is not "id, text, author"
export async function POST(req: Request) {
  const request = await req.json();
  console.log(request);
  const { text, author } = request;
  return NextResponse.json({
    endpoint: "quotes/add-quote",
    method: req.method,
    body: request,
    data: { text, author },
  });
}
