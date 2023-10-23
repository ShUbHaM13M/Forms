"use client";

import Header from "../../../../_components/create-form-header";
import { Layout, Space } from "antd";
import FormMetaCard from "../../../../_components/form-meta-card";
import { QuestionList, ToolBar } from "../../../../_components";

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
