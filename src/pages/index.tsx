import type { NextPage } from "next";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const question = useRef<HTMLInputElement>(null);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-1/2 justify-around h-32">
        <input
          className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal max-w-lg"
          ref={question}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-32"
          onClick={(e) => {
            if (!question.current || question.current.value == "") return;

            console.log(question.current.value);
            question.current.value = "";
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
