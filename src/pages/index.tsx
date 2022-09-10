import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <h1 className="h-auto text-5xl">Polls app </h1>
      <Link href="/create">
        <a className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center">
          Create Question
        </a>
      </Link>
    </div>
  );
}
