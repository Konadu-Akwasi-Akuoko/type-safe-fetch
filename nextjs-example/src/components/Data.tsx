import { Dispatch, SetStateAction, useState } from "react";

export default function Data({ setQuotes, quotes }: any) {
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
    setQuotes(response.data.quotes); // <-- rewriting this as setQuotes(response.data) will make the app crash
    setEndpoint(response.endpoint);
    setMethod(response.method);
    setBody(response.body);
  };
  return (
    <section className="mt-10">
      <h2 className="text-3xl mb-6">Data</h2>
      <p className="mb-6">
        Fetch data from the server and display it in the browser, inside the
        code you will notice that the fetch API we used is not type safe and we
        had to provide a way to get the data our selves, one least mistake and
        the app would crash. Check out this file `` and see how the app is
        crashing due to not getting the objects the right way.
      </p>
      <button
        onClick={fetchDataNotTypeSafe}
        className="p-4 bg-blue-600 hover:bg-blue-800 text-white rounded-md"
      >
        Fetch Data
      </button>
      {/* Response from the sever */}
      <div>
        <h3 className="text-2xl my-6">Response from the server</h3>

        <p className="mt-6 font-bold">Quotes:</p>
        <div className="flex flex-row flex-wrap justify-between gap-4 mb-4">
          {/* At this point you need to guess the types yourself */}
          {quotes.map((quote: { id: string; text: string; author: string }) => {
            return (
              <div
                key={quote.id}
                className="p-6 bg-blue-200 w-full lg:w-[30%] rounded-md flex flex-col justify-between gap-3"
              >
                <p>ID: {quote.id}</p>
                <p>Text: {quote.text}</p>
                <p>Author: {quote.author}</p>
              </div>
            );
          })}
        </div>

        <p className="font-bold mb-4">Endpoint: {endpoint}</p>
        <p className="font-bold mb-4">Method: {method}</p>
        <p className="font-bold mb-4">Body: {body ? body : "null"}</p>
      </div>
    </section>
  );
}
