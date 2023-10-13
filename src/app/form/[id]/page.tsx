"use client";

import { FormState } from "@/app/create-form/CreateFormStore";
import { ConfigProvider, Form, Layout, Space } from "antd";
import theme from "@/theme/themeConfig";
import { useEffect, useState } from "react";
import { Question } from "@/app/components";

async function getForm(id: string) {
  const res = await fetch(`/api/form/${id}`);
  return await res.json();
}

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<(FormState & { id: string }) | null>(null);

  useEffect(() => {
    getForm(params.id).then((data) => {
      if (data.error) {
      } else {
        setForm(data.form);
      }
      setLoading(false);
    });
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
