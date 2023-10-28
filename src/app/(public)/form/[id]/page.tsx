"use client";

import { ConfigProvider, Form, Layout, Space } from "antd";
import theme from "@/theme/themeConfig";
import { useEffect, useState } from "react";
import { Question } from "@/app/_components";
import { useFormService } from "@/app/_services";

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const formService = useFormService();
  const form = formService.forms[0];
  console.log(form);

  useEffect(() => {
    formService.getById(params.id).finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  if (!form) return <div>404! The form was not found</div>;

  return (
    <ConfigProvider theme={theme}>
      <Layout className="layout">
        <Layout.Content className="container">
          <Form>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {form.questions &&
                form.questions.map((question) => (
                  <Question key={question.id} question={question} />
                ))}
            </Space>
          </Form>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
