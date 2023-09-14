export type AnswerType =
  | "short-answer"
  | "long-answer"
  | "radio-answer"
  | "checkbox-answer";

export type Question = {
  id: string;
  title?: string;
  answerType: AnswerType;
};
