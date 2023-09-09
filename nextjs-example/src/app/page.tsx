"use client";

import Data from "@/components/Data";
import Input from "@/components/Input";
import { useState } from "react";

export default function Home() {
  const [quotes, setQuotes] = useState([]);

  return (
    <main className="mx-[5%] lg:mx-[20%] mt-10">
      <h1 className="text-center text-4xl">ts-fetch Example with NextJS</h1>
      <Data setQuotes={setQuotes} quotes={quotes} />
      <Input setQuotes={setQuotes} quotes={quotes} />
    </main>
  );
}
