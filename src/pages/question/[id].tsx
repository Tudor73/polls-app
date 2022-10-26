import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Question } from "../create";

export interface Vote {
  optionPicked: number;
  questionId: string;
}
const fetchQuestion = async (id: string | undefined | string[]): Promise<Question> => {
  const response = await fetch(`/api/question/${id}`);
  const question = await response.json();
  return question;
};

const handleSubmit = async (id: string, optionPicked: string) => {
  const newVote: Vote = {
    optionPicked: Number(optionPicked) + 1,
    questionId: String(id),
  };
  const response = await fetch("/api/question/vote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVote),
  });
};

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [optionSelected, setOptionSelected] = useState("");

  const { data, status } = useQuery(["question", id], () => fetchQuestion(id), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-around h-1/2 max-w-4xl">
        <h1 className="text-6xl"> {data?.description} </h1>
        <div className="w-full">
          {data?.options.map((option: string, idx: number) => {
            {
              if (optionSelected === String(idx)) {
                return (
                  <p key={idx} className="px-4 py-4 border-2 mb-2 bg-gray-800 cursor-pointer ">
                    {option}
                  </p>
                );
              }
            }
            return (
              <p
                key={idx}
                className="px-4 py-4 border-2 mb-2 hover:bg-gray-800 cursor-pointer"
                id={String(idx)}
                onClick={(event) => {
                  setOptionSelected(event.currentTarget.id);
                }}
              >
                {option}
              </p>
            );
          })}
        </div>
        <a
          className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center self-end cursor-pointer"
          onClick={() => {
            handleSubmit(id as string, optionSelected);
          }}
        >
          Submit
        </a>
      </div>
    </div>
  );
};

export default QuestionPage;
