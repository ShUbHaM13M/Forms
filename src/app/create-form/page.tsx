"use client";

import { Button, Card, Divider, Layout, Space } from "antd";
import CreateQuestion from "../components/create-question";
import { EyeOutlined } from "@ant-design/icons";
import { InputWithToolbar } from "../components";
import CreateFormProvider from "./CreateFormContext";
import FormMetaCard from "./FormMetaCard";

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
            <CreateQuestion />
          </Space>
        </Layout.Content>
      </Layout>
    </CreateFormProvider>
  );
};

export default CreateForm;
