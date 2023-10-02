"use client";

import Header from "./Header";
import { Layout, Space } from "antd";
import FormMetaCard from "./FormMetaCard";
import { QuestionList, ToolBar } from "../components";

const CreateForm = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content className="container">
        <Space direction="vertical">
          <FormMetaCard />
          <QuestionList />
        </Space>

        <ToolBar />
      </Layout.Content>
    </Layout>
  );
};

export default CreateForm;
