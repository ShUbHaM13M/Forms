import { Button, Card, Col, Divider, Input, Row, Select, Space } from "antd";
import { useCallback, useState } from "react";
import { answerComponentMap, answerTypes } from "./utils";
import { AnswerType, Question } from "@/app/global";
import {
  CreateFormActionKind,
  useCreateFormData,
} from "@/app/create-form/CreateFormContext";
import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const AnswerOptions = ({
  onChange,
  defaultValue,
}: {
  onChange: (answerType: AnswerType) => void;
  defaultValue: AnswerType;
}) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue={defaultValue}
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

const CreateQuestion = ({ id, title, answerType }: Question) => {
  const { dispatchFormData } = useCreateFormData();

  const onAnswerTypeOptionChange = useCallback((answerType: AnswerType) => {
    dispatchFormData({
      type: CreateFormActionKind.UPDATE_QUESTION_ANSWER_TYPE,
      payload: {
        id,
        answerType,
      },
    });
  }, []);

  const AnswerComponent = answerComponentMap[answerType || "short-answer"];

  return (
    <Card
      bordered={true}
      className="card"
      title={
        <Row gutter={[8, 16]}>
          <Col span={16}>
            <Input
              placeholder="Enter question"
              value={title || ""}
              onChange={(e) => {
                dispatchFormData({
                  type: CreateFormActionKind.UPDATE_QUESTION_TITLE,
                  payload: {
                    id,
                    title: e.currentTarget.value,
                  },
                });
              }}
            />
          </Col>
          <Col span={8}>
            <AnswerOptions
              defaultValue={answerType || "short-answer"}
              onChange={onAnswerTypeOptionChange}
            />
          </Col>
        </Row>
      }
    >
      <Card.Grid hoverable={false} style={{ width: "100%" }}>
        <AnswerComponent />
      </Card.Grid>
      <Card.Grid hoverable={false} style={{ width: "100%", padding: 16 }}>
        {/* FIXME: Just a placeholder for now */}
        <Row>
          <Col flex="auto" />
          <Col>
            <Button type="text" icon={<CopyOutlined />} key="copy" />
          </Col>

          <Col style={{ display: "flex", alignItems: "center" }}>
            <Divider type="vertical" />
          </Col>

          <Col>
            <Button
              onClick={() =>
                dispatchFormData({
                  type: CreateFormActionKind.DELETE_QUESTION,
                  payload: { id },
                })
              }
              type="text"
              icon={<DeleteOutlined />}
              key="delete"
            />
          </Col>

          <Col style={{ display: "flex", alignItems: "center" }}>
            <Divider type="vertical" />
          </Col>

          <Col>
            <Button type="text" icon={<EllipsisOutlined />} key="ellipsis" />
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  );
};

export default CreateQuestion;
