import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { Question } from "./create";

export default function Home() {
  const { data, isLoading } = useQuery(["questions"], async (): Promise<Question[]> => {
    return await fetch("/api/question").then((res) => res.json());
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <h1 className="h-auto text-5xl">Polls app </h1>
      <Link href="/create">
        <a className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center">
          Create Question
        </a>
      </Link>
      <div className="grid grid-cols-3 w-full gap-y-8 justify-items-center">
        {data?.map((question, index) => {
          return (
            <div className="" key={index}>
              <Link
                href={{
                  pathname: `/question/${question.id}`,
                  query: {
                    question: question.description,
                    options: question.options,
                  },
                }}
              >
                <a className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center cursor-pointer">
                  {question.description}
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
