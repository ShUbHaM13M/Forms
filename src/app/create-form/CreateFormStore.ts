import { AnswerType, Question } from "../global";
import { uuidv4 } from "../components/sortable-list/utils";
import { create } from "zustand";

interface CreateFormState {
  title: string;
  description: string;
  questions: Question[];

  setTitle: (title: string) => void;
  setDescription: (description: string) => void;

  addQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  updateQuestionTitle: (id: string, title: string) => void;
  updateQuestionAnswerType: (id: string, answerType: AnswerType) => void;
}

const useCreateFormStore = create<CreateFormState>((set) => ({
  title: "",
  description: "",
  questions: [
    {
      answerType: "short-answer",
      title: "Question 0",
      id: uuidv4(),
    },
    {
      answerType: "long-answer",
      title: "Question 1",
      id: uuidv4(),
    },
    {
      answerType: "radio-answer",
      title: "Question 2",
      id: uuidv4(),
    },
    {
      answerType: "checkbox-answer",
      title: "Question 3",
      id: uuidv4(),
    },
  ],

  setTitle: (title) => set(() => ({ title })),
  setDescription: (description) => set(() => ({ description })),

  addQuestion: (question) =>
    set(({ questions }) => ({ questions: [...questions, question] })),
  deleteQuestion: (id) =>
    set(({ questions }) => ({
      questions: questions.filter((question) => question.id !== id),
    })),

  updateQuestionTitle: (id, title) =>
    set(({ questions }) => ({
      questions: questions.map((question) => {
        if (question.id === id) {
          question.title = title;
        }
        return question;
      }),
    })),

  updateQuestionAnswerType: (id, answerType) =>
    set(({ questions }) => ({
      questions: questions.map((question) => {
        if (question.id === id) question.answerType = answerType;
        return question;
      }),
    })),
}));

export default useCreateFormStore;
