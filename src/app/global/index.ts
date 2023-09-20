export type AnswerType =
  | "short-answer"
  | "long-answer"
  | "radio-answer"
  | "checkbox-answer"
  | "date-answer"
  | "time-answer"
  | "color-answer";

export type Question = {
  id: string;
  title?: string;
  answerType: AnswerType;
};
