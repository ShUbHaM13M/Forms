import { Card, Col, Input, Radio, Row, Select, Space } from "antd";
import { InputWithToolbar } from "..";
import { useCallback, useState } from "react";
import { CreateQuestionProps, answerComponentMap, answerTypes } from "./utils";
import { AnswerType } from "@/app/global";

const AnswerOptions = ({
  onChange,
}: {
  onChange: (answerType: AnswerType) => void;
}) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue="short-answer"
      onChange={onChange}
    >
      {answerTypes.map(({ label, value, icon }) => (
        <Select.Option key={value} value={value} label={label}>
          <Space>
            {icon}
            {label}
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};

const CreateQuestion = ({ titlePlaceholder }: CreateQuestionProps) => {
  const [selectedAnswerType, setSelectedAnswerType] =
    useState<AnswerType>("short-answer");

  const onAnswerTypeOptionChange = useCallback((answerType: AnswerType) => {
    setSelectedAnswerType(answerType);
  }, []);

  const AnswerComponent = answerComponentMap[selectedAnswerType];

  return (
    <Card
      bordered={true}
      className="card"
      title={
        <Row gutter={[8, 16]}>
          <Col span={16}>
            <InputWithToolbar inputProps={{ placeholder: titlePlaceholder }} />
          </Col>
          <Col span={8}>
            <AnswerOptions onChange={onAnswerTypeOptionChange} />
          </Col>
        </Row>
      }
    >
      <AnswerComponent />
    </Card>
  );
};

export default CreateQuestion;
