/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Divider, Input, Row, Select, Space } from "antd";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { answerComponentMap, answerTypes } from "./utils";
import { AnswerType, Question } from "@/app/global";
import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import useCreateFormStore from "@/app/create-form/CreateFormStore";

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

const CreateQuestion = ({ title, id, answerType }: Question) => {
  const updateQuestionTitle = useCreateFormStore(
    (state) => state.updateQuestionTitle
  );
  const updateAnswerType = useCreateFormStore(
    (state) => state.updateQuestionAnswerType
  );
  const deleteQuestion = useCreateFormStore((state) => state.deleteQuestion);

  const handleUpdateQuestionTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      updateQuestionTitle(id, e.currentTarget.value);
    },
    []
  );

  const handleAnswerTypeChange = useCallback((answerType: AnswerType) => {
    updateAnswerType(id, answerType);
  }, []);

  const handleDeleteQuestion = useCallback(() => {
    deleteQuestion(id);
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
              onChange={handleUpdateQuestionTitle}
            />
          </Col>
          <Col span={8}>
            <AnswerOptions
              defaultValue={answerType || "short-answer"}
              onChange={handleAnswerTypeChange}
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
              onClick={handleDeleteQuestion}
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

export default memo(CreateQuestion);
