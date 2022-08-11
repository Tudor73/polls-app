import type { NextPage } from "next";
import { useRef, useState } from "react";

interface Question {
  description: string;
  options: string[];
  votes?: number[];
}

const Home: NextPage = () => {
  const question = useRef<HTMLInputElement>(null);

  const optionsRef = useRef<string[]>([]);

  const [options, setOptions] = useState<string[]>([]);

  const handleQuestionCreate = async () => {
    if (!question.current || question.current.value == "") return;
    const obj: Question = {
      description: question.current.value,
      options: optionsRef.current,
    };
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    question.current.value = "";
    setOptions([]);
  };

  return (
    <div className="flex flex-col items-center justify-around h-96">
      <h1 className="h-auto text-4xl">Polls app</h1>
      <div className="flex flex-col items-center w-5/12 h-32">
        <input
          placeholder="Question"
          className="bg-white focus:outline-none border border-gray-300  rounded-lg py-4 px-4 block w-full appearance-none leading-normal text-lg"
          ref={question}
        />
        {options.map((option, index) => {
          return (
            <input
              key={index}
              placeholder="Add option"
              className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              ref={(element) => {
                if (!element || element.value === "") return;
                else {
                  optionsRef.current[index] = element.value;
                }
              }}
            />
          );
        })}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-lg w-32 self-end"
          onClick={(e) => {
            console.log(optionsRef.current);
            setOptions([...options, ""]);
          }}
        >
          Add option
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
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
