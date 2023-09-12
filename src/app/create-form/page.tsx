"use client";

import { Button, Layout, Space } from "antd";
import CreateQuestion from "../components/create-question";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";

const CreateForm = () => {
  // const [questions, setQuestions] = useState([]);

  return (
    <Layout className="layout">
      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          target="_blank"
          href="/"
          type="primary"
          shape="circle"
          icon={<EyeOutlined />}
        />
      </Layout.Header>
      <Layout.Content className="container">
        <Space direction="vertical">
          <CreateQuestion titlePlaceholder="Enter Form title" />
          <CreateQuestion withAnswerOptions />
        </Space>
      </Layout.Content>
    </Layout>
  );
};

export default CreateForm;
