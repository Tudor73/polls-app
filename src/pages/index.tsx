import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { Question } from "./create";

export default function Home() {
  const { data, isLoading } = useQuery(
    ["questions"],
    async (): Promise<Question[]> => {
      return await fetch("/api/question").then((res) => res.json());
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-around h-screen w-screen">
      <h1 className="h-auto text-5xl">Polls app </h1>
      <Link href="/create">
        <a className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center">
          Create Question
        </a>
      </Link>
      <div className="grid grid-rows-4 grid-flow-col w-full justify-items-center gap-y-10">
        {data?.map((question, index) => {
          return (
            <div className="" key={index}>
              <a className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center cursor-pointer">
                {question.description}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
