import { Card, Form, Input, InputProps, Radio, Space } from "antd";
import { TextAreaProps } from "antd/es/input";

type RequiredAttributes<T, K extends keyof T> = Required<Pick<T, K>>;

interface AnswerTypeShort {
  type: "short-answer";
  inputProps: RequiredAttributes<InputProps, "name">;
}

interface AnswerTypeLong {
  type: "long-answer";
  inputProps: RequiredAttributes<TextAreaProps, "name">;
}

interface AnswerTypeOptions {
  type: "option-answer";
  options: string[];
  inputProps: RequiredAttributes<InputProps, "name">;
}

export type AnswerType = AnswerTypeShort | AnswerTypeLong | AnswerTypeOptions;

export type QuestionType = {
  title: string;
  answer: AnswerType;
  isRequired?: boolean;
};

function renderAnswerComponent(answer: AnswerType) {
  let InputField: React.ReactElement = <></>;

  switch (answer.type) {
    case "short-answer": {
      InputField = <Input {...answer.inputProps} />;
      break;
    }
    case "long-answer": {
      InputField = <Input.TextArea {...answer.inputProps} />;
      break;
    }
    case "option-answer": {
      InputField = (
        <Radio.Group>
          <Space direction="vertical">
            {answer.options.map((option) => (
              <Radio value={option} key={option}>
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      );
      break;
    }
    default:
      break;
  }
  return (
    <Form.Item name={answer.inputProps.name} rules={[{ required: true }]}>
      {InputField}
    </Form.Item>
  );
}

const Question = ({ answer, title, isRequired = true }: QuestionType) => {
  return <Card title={title}>{renderAnswerComponent(answer)}</Card>;
};

export default Question;
