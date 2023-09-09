"use client";

import { useState } from "react";

export default function NotTypeSafeData() {
  const [quotes, setQuotes] = useState([]);
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState("");
  const [body, setBody] = useState("");

  // This fetch api is not type safe
  const fetchDataNotTypeSafe = async () => {
    const request = await fetch("/api/quotes", { method: "GET" });

    // This is not type safe, how would you know the type of the
    // response returned by the server?
    const response = await request.json();
    console.log(response);

    // Not type safe, least mistake and your whole app will crash
    setQuotes(response.data); // <-- This will give un an error, because if we wanted the data we should have done `response.data.quotes`
    setEndpoint(response.endpoint);
    setMethod(response.method);
    setBody(response.body);
  };
  return (
    <section className="mt-10">
      <h2 className="text-3xl mb-6">Data</h2>
      <button
        onClick={fetchDataNotTypeSafe}
        className="p-4 bg-blue-600 hover:bg-blue-800 text-white rounded-md"
      >
        Fetch Data
      </button>
      {/* Response from the sever */}
      <div>
        <h3 className="text-2xl my-6">Response from the server</h3>

        <h3 className="text-xl my-6">Quotes</h3>
        <div className="grid grid-rows-3">
          {/* At this point you need to guess the types yourself */}
          {quotes.map((quote: { id: string; text: string; author: string }) => {
            return (
              <div key={quote.id} className="p-6 bg-blue-200">
                <p>ID: {quote.id}</p>
                <p>Text: {quote.text}</p>
                <p>Author: {quote.author}</p>
              </div>
            );
          })}
        </div>

        <p>Endpoint: {endpoint}</p>
        <p>Method: {method}</p>
        <p>Body: {body ? body : "null"}</p>
      </div>
    </section>
  );
}
