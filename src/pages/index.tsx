import { Prisma } from "@prisma/client";
import type { NextPage } from "next";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const question = useRef<HTMLInputElement>(null);

  const handleQuestionCreate = async () => {
    if (!question.current || question.current.value == "") return;

    const response = await fetch("/api/question", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question.current.value),
    });
    question.current.value = "";
  };

  return (
    <div className="flex flex-col items-center justify-around h-96">
      <h1 className="h-auto text-4xl">Polls app</h1>
      <div className="flex flex-col items-center w-1/2 justify-around h-32">
        <input
          className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal max-w-lg"
          ref={question}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-32"
          onClick={(e) => {
            e.preventDefault();
            handleQuestionCreate();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Home;
