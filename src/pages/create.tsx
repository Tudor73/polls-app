import type { NextPage } from "next";
import React, { SyntheticEvent, useRef, useState } from "react";
import { Field, FieldValues, useFieldArray, useForm } from "react-hook-form";

export type Question = {
  id?: string;
  description: string;
  options: string[];
  votes: {};
};
type FormValues = {
  question: string;
  options: { optionId: string; value: string }[];
};

const CreateQuestion: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "options" });

  const handleQuestionCreate = async (data: FormValues) => {
    if (fields.length >= 2) {
      clearErrors();
    } else {
      setError("options", {
        type: "custom",
        message: "You need at least 2 options",
      });
      return;
    }
    const obj: Question = {
      description: data.question,
      options: data.options.map((option) => option.value).filter((value: string) => value !== ""),
      votes: {},
    };
    const response = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    reset(); //resets form
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen">
      <h1 className="h-auto text-5xl ">Create Question</h1>
      <div className="flex flex-col items-center w-10/12 h-64 text-black justify-around">
        <form
          onSubmit={handleSubmit(handleQuestionCreate)}
          className="flex flex-col items-center h-64 text-black justify-around"
        >
          <input
            placeholder="Question"
            {...register("question", { required: "Question cannot be empty" })}
            className="bg-white focus:outline-none border border-gray-300  rounded-lg py-4 px-4 block w-full appearance-none leading-normal text-lg"
          />
          {errors.question && <p className="text-red-500">{errors.question?.message}</p>}
          {fields.map((field, index) => {
            return (
              <input
                key={field.id}
                placeholder="Add option"
                className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                {...register(`options.${index}.value` as const, {
                  required: "Option cannot be empty",
                })}
              />
            );
          })}
          {errors.options && <p className="text-red-500">{errors.options?.message}</p>}
          <button
            type="button"
            className="bg-violet-600 hover:bg-violet-700 text-white  py-2 px-4 rounded-lg w-32 self-end"
            onClick={(e) => {
              append({ optionId: `${fields.length + 1}`, value: "" });
            }}
          >
            Add option
          </button>

          <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateQuestion;
