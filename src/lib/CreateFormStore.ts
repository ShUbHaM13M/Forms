import { AnswerType, Question } from "./types";
import { uuidv4 } from "../app/_components/sortable-list/utils";
import { create } from "zustand";

export interface FormState {
  title: string;
  description: string;
  questions: Question[];
}

interface CreateFormState extends FormState {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;

  addQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (index: number) => void;

  updateQuestionTitle: (id: string, title: string) => void;
  updateQuestionDescription: (id: string, description: string) => void;
  updateQuestionAnswerType: (id: string, answerType: AnswerType) => void;
  updateQuestionOptions: (id: number, options: { [key: string]: any }) => void;

  getFormData: () => FormState;
  setFormData: (form: FormState | null) => void;
}

const initialState: FormState = {
  title: "Form title",
  description: "Form description",
  questions: [
    {
      id: uuidv4(),
      title: "Question 0",
      answerType: "short-answer",
    },
  ],
};

const useCreateFormStore = create<CreateFormState>((set, get) => ({
  ...initialState,

  setTitle: (title) => set(() => ({ title })),
  setDescription: (description) => set(() => ({ description })),

  addQuestion: (question) =>
    set(({ questions }) => ({ questions: [...questions, question] })),
  deleteQuestion: (id) =>
    set(({ questions }) => ({
      questions: questions.filter((question) => question.id !== id),
    })),

  duplicateQuestion: (index) =>
    set(({ questions }) => {
      questions.splice(index, 0, {
        ...questions[index],
        id: uuidv4(),
      });
      return {
        questions: [...questions],
      };
    }),

  updateQuestionTitle: (id, title) =>
    set(({ questions }) => ({
      questions: questions.map((question) => {
        if (question.id === id) {
          question.title = title;
        }
        return question;
      }),
    })),

  updateQuestionDescription: (id, description) =>
    set(({ questions }) => ({
      questions: questions.map((question) => {
        if (question.id === id) {
          question.description = description;
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

  updateQuestionOptions: (index, options) => {
    set(({ questions }) => ({
      questions: questions.map((question, questionIndex) => {
        if (index === questionIndex)
          question.answerOptions = { ...question.answerOptions, ...options };
        return question;
      }),
    }));
  },

  getFormData: () => {
    const { title, description, questions } = get();
    return {
      title,
      description,
      questions,
    };
  },

  setFormData: (form) => {
    if (form) set(form);
    else set(initialState);
  },
}));

export default useCreateFormStore;
