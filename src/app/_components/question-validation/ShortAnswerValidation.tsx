import { Col, Form, Input, Row, Select, Space, Switch } from "antd";
import React, { useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

const inputTypeOptions: SelectOption[] = [
  {
    label: "Number",
    value: "number",
  },
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Email",
    value: "email",
  },
];

const TextFieldOptions = () => {
  return (
    <Row style={{ width: "100%" }}>
      <Col span={24 / 2}>
        <Input placeholder="Min" />
      </Col>
      <Col span={24 / 2}>
        <Input placeholder="Max" />
      </Col>
    </Row>
  );
};

const validationOptions: { [key: string]: React.ReactNode | null } = {
  number: null,
  email: null,
  text: <TextFieldOptions />,
};

const ShortAnswerValidation = () => {
  // TODO: default value based on data from store
  const [inputType, setInputType] = useState("text");

  return (
    <Row style={{ width: "100%" }} gutter={[8, 8]}>
      <Col span={24 / 3}>
        <Select
          placeholder="Input type"
          style={{ width: "100%" }}
          defaultValue="text"
          options={inputTypeOptions}
          onChange={(value) => setInputType(value)}
        />
      </Col>
      <Col span={24 - 8}>{validationOptions[inputType]}</Col>
      <Col span={24 / 3} offset={0}>
        <Space direction="horizontal">
          <label>Show count</label>
          <Switch size="small" />
        </Space>
      </Col>
    </Row>
  );
};

export default ShortAnswerValidation;
