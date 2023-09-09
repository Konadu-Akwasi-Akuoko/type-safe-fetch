import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function InputNotTypeSafe({ setQuotes, quotes }: any) {
  const [quoteText, setQuoteText] = useState("");
  const setQuote = (e: ChangeEvent<HTMLInputElement>) => {
    setQuoteText(e.target.value);
  };

  const [authorText, setAuthorText] = useState("");
  const setAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorText(e.target.value);
  };

  const [anotherText, setAnotherText] = useState("");
  const setAnother = (e: ChangeEvent<HTMLInputElement>) => {
    setAnotherText(e.target.value);
  };

  // Handle submit with un safe fetch with no typings
  const addQuoteNotTypeSafe = async () => {
    const request = await fetch("/api/quotes/add-quote", {
      method: "POST",
      // This is not type safe at all, under normal circumstance where
      // everything is type safe the addition of the `another` property
      // will be an error
      body: JSON.stringify({
        quote: quoteText, // <-- by changing the `text` property to `author` we would not get the desired output, it is not type safe
        author: authorText,
        another: anotherText,
      }),
    });
    const response = await request.json();
    console.log(response);
    // Not type safe, least mistake and your whole app will crash
    const newQuote = [
      ...quotes,
      {
        id: quotes.length + 1,
        text: response.data.text,
        author: response.data.author,
      },
    ];
    setQuotes(newQuote);
  };

  return (
    <section className="mt-10">
      {/* Input section */}
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="quote">Your quote</label>
          <input
            value={quoteText}
            onChange={setQuote}
            type="text"
            name="quote"
            id="quote"
            placeholder="Enter your quote"
            className="bg-slate-50 border border-black focus-within:focus:focus-visible:bg-blue-50 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-[48%]">
          <label htmlFor="quote">Author</label>
          <input
            value={authorText}
            onChange={setAuthor}
            type="text"
            name="quote"
            id="quote"
            placeholder="Author"
            className="bg-slate-50 border border-black focus-within:focus:focus-visible:bg-blue-50 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-[48%]">
          <label htmlFor="quote">
            This message is unwanted on the server sever
          </label>
          <input
            value={anotherText}
            onChange={setAnother}
            type="text"
            name="quote"
            id="quote"
            placeholder="Type in any message here "
            className="bg-slate-50 border border-black focus-within:focus:focus-visible:bg-blue-50 p-2 rounded-md"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-row gap-6">
        <button
          onClick={addQuoteNotTypeSafe}
          className="p-4 bg-blue-600 hover:bg-blue-800 text-white rounded-md"
        >
          Add Your Quote
        </button>
      </div>
    </section>
  );
}
