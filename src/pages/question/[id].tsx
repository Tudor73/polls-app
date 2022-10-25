import { useRouter } from "next/router";

export interface Vote {
  optionPicked: number;
  questionId: string;
}

const QuestionPage = () => {
  const router = useRouter();

  const { id, question } = router.query;
  const options = router.query.options as string[];

  const handleSubmit = async () => {
    const newVote: Vote = {
      optionPicked: 2,
      questionId: String(id),
    };

    const response = await fetch("/api/question/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVote),
    });
    console.log(response);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-around h-1/2 max-w-4xl">
        <h1 className="text-6xl"> {question} </h1>
        <div className="w-full">
          {options.map((option: string, idx: number) => {
            return (
              <p key={idx} className="px-4 py-4 border-2 mb-2 hover:bg-gray-800 cursor-pointer">
                {option}
              </p>
            );
          })}
        </div>
        <a
          className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-40 text-center self-end cursor-pointer"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </a>
      </div>
    </div>
  );
};

export default QuestionPage;
