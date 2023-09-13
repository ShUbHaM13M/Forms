import { AnswerType } from "@/app/global";
import {
  ShortAnswer,
  Paragraph,
  RadioAnswer,
  CheckboxAnswer,
} from "./answer-type";

export type CreateQuestionProps = {
  titlePlaceholder?: string;
  withAnswerOptions?: boolean;
};

export type AnswerOptionType = {
  value: AnswerType;
  label: string;
  icon?: React.ReactNode;
};

export const answerTypes: AnswerOptionType[] = [
  {
    value: "short-answer",
    label: "Short answer",
  },
  {
    value: "long-answer",
    label: "Paragraph",
  },
  {
    value: "radio-answer",
    label: "Multiple choice",
  },
  {
    value: "checkbox-answer",
    label: "Checkboxes",
  },
];

export const answerComponentMap: { [key in AnswerType]: () => JSX.Element } = {
  "short-answer": ShortAnswer,
  "long-answer": Paragraph,
  "radio-answer": RadioAnswer,
  "checkbox-answer": CheckboxAnswer,
};
