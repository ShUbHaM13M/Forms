import { AnswerType } from "@/app/global";
import {
  ShortAnswer,
  Paragraph,
  RadioAnswer,
  CheckboxAnswer,
  DateAnswer,
  TimeAnswer,
  ColorAnswer,
} from "./answer-type";
import {
  ParagraphValidation,
  ShortAnswerValidation,
} from "../question-validation";
import { InputProps } from "antd";

export type CreateQuestionProps = {
  title?: string;
  answerType?: AnswerType;
};

export type AnswerOptionType = {
  value: AnswerType;
  label: string;
  icon?: React.ReactNode;
};

type AnswerMap = {
  label: string;
  icon?: null; // FIXME: null for now
  Component: (props: any) => JSX.Element;
};

export const answerMap: {
  [key in AnswerType]: AnswerMap;
} = {
  "short-answer": { label: "Short answer", Component: ShortAnswer },
  "long-answer": { label: "Paragraph", Component: Paragraph },
  "radio-answer": { label: "Single choice", Component: RadioAnswer },
  "checkbox-answer": { label: "Checkboxes", Component: CheckboxAnswer },
  "date-answer": { label: "Date", Component: DateAnswer },
  "time-answer": {
    label: "Time",
    icon: undefined,
    Component: TimeAnswer,
  },
  "color-answer": {
    label: "Color",
    icon: undefined,
    Component: ColorAnswer,
  },
};

export const validationOptionMap: {
  [key in AnswerType]: () => JSX.Element;
} = {
  "short-answer": ShortAnswerValidation,
  "long-answer": ParagraphValidation,
  "radio-answer": function (): JSX.Element {
    throw new Error("Function not implemented.");
  },
  "checkbox-answer": function (): JSX.Element {
    throw new Error("Function not implemented.");
  },
  "date-answer": function (): JSX.Element {
    throw new Error("Function not implemented.");
  },
  "time-answer": function (): JSX.Element {
    throw new Error("Function not implemented.");
  },
  "color-answer": function (): JSX.Element {
    throw new Error("Function not implemented.");
  },
};
