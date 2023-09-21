/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Divider, Input, Popover, Row } from "antd";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { answerMap, validationOptionMap } from "./utils";
import { AnswerType, Question } from "@/app/global";
import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import useCreateFormStore from "@/app/create-form/CreateFormStore";
import AnswerTypeSelect from "./AnswerTypeSelect";
import AnswerOptionDropdown from "./AnswerOptionDropdown";

const CreateQuestion = ({
  title,
  id,
  answerType,
  description,
  answerOptions,
  index,
}: Question & { index: number }) => {
  const [showDescription, setShowDescription] = useState(!!description);
  const [showValidationOptions, setShowValidationOptions] = useState(() => {
    if (answerOptions && Object.keys(answerOptions).length) return true;
    return false;
  }); // FIXME: Update based on stored options in question data

  const updateQuestionTitle = useCreateFormStore(
    (state) => state.updateQuestionTitle
  );
  const updateAnswerType = useCreateFormStore(
    (state) => state.updateQuestionAnswerType
  );
  const deleteQuestion = useCreateFormStore((state) => state.deleteQuestion);
  const duplicateQuestion = useCreateFormStore(
    (state) => state.duplicateQuestion
  );

  const updateQuestionDescription = useCreateFormStore(
    (state) => state.updateQuestionDescription
  );

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

  const handleDuplicateQuestion = useCallback(() => {
    duplicateQuestion(index);
  }, [index]);

  const toggleDescription = useCallback(() => {
    setShowDescription((prev) => {
      if (!prev === false) updateQuestionDescription(id, "");
      return !prev;
    });
  }, []);

  const toggleValidationOptions = useCallback(() => {
    setShowValidationOptions((prev) => !prev);
  }, []);

  const AnswerComponent = answerMap[answerType || "short-answer"].Component;
  const AnswerValidationOptions = validationOptionMap[answerType];

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
            <AnswerTypeSelect
              defaultValue={answerType || "short-answer"}
              onChange={handleAnswerTypeChange}
            />
          </Col>
        </Row>
      }
    >
      <Card.Grid hoverable={false} style={{ width: "100%" }}>
        {showDescription ? (
          <>
            <Input
              maxLength={50}
              placeholder="description"
              value={description}
              onChange={(e) => {
                updateQuestionDescription(id, e.currentTarget.value);
              }}
            />
            <Divider dashed style={{ marginBlock: 10 }} />
          </>
        ) : (
          ""
        )}
        <AnswerComponent validationProps={answerOptions} />
        {showValidationOptions ? (
          <>
            <Divider dashed style={{ marginBlock: 10 }} />
            <AnswerValidationOptions />
          </>
        ) : (
          ""
        )}
      </Card.Grid>
      <Card.Grid
        hoverable={false}
        style={{ width: "100%", padding: 16, paddingBlock: 8 }}
      >
        {/* FIXME: Just a placeholder for now */}
        <Row>
          <Col flex="auto" />
          <Col>
            <Button
              type="text"
              icon={<CopyOutlined />}
              key="copy"
              onClick={handleDuplicateQuestion}
            />
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
            <Popover
              placement="bottomLeft"
              arrow={false}
              trigger="click"
              title="Options"
              content={
                <AnswerOptionDropdown
                  options={[
                    {
                      label: "Description",
                      action: toggleDescription,
                      active: showDescription,
                    },
                    {
                      label: "Validation",
                      action: toggleValidationOptions,
                      active: showValidationOptions,
                    },
                  ]}
                />
              }
            >
              <Button type="text" icon={<EllipsisOutlined />} key="ellipsis" />
            </Popover>
          </Col>
        </Row>
      </Card.Grid>
    </Card>
  );
};

export default memo(CreateQuestion);
