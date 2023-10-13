import { Question } from "@/app/global";
import { Card, Form, Input, Radio, Space } from "antd";
import { useEffect } from "react";

function renderAnswerComponent(question: Question) {
  let InputField: React.ReactElement = <>Not Yet Implemented!</>;

  switch (question.answerType) {
    case "short-answer": {
      console.log(question);
      InputField = <Input name={question.title} {...question.validations} />;
      break;
    }
    case "long-answer": {
      InputField = (
        <Input.TextArea name={question.title} {...question.validations} />
      );
      break;
    }
    case "radio-answer": {
      const options = question.answerOptions?.choices
        ? question.answerOptions.choices
        : [];

      InputField = (
        <Radio.Group name={question.title}>
          <Space direction="vertical">
            {options.map((option) => (
              <Radio value={option.label} key={option.id}>
                {option.label}
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
  return <Form.Item rules={[{ required: true }]}>{InputField}</Form.Item>;
}

const Question = ({ question }: { question: Question }) => {
  const Answer = renderAnswerComponent(question);
  return <Card title={question.title}>{Answer}</Card>;
};

export default Question;
