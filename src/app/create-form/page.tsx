"use client";

import { Button, Layout, Space } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import CreateFormProvider from "./CreateFormContext";
import FormMetaCard from "./FormMetaCard";
import { QuestionList, ToolBar } from "../components";

const CreateForm = () => {
  return (
    <CreateFormProvider>
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
            <FormMetaCard />
            <QuestionList />
          </Space>

          <ToolBar />
        </Layout.Content>
      </Layout>
    </CreateFormProvider>
  );
};

export default CreateForm;
