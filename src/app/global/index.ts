import { InputProps } from "antd";

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
  description?: string;
  answerType: AnswerType;
  answerOptions?: {
    choices?: {
      id: string;
      label: string;
    }[];
    [key: string]: any;
  };
  validations?: { [key: string]: any };
};
