"use client";

import {
  Button,
  ConfigProvider,
  Form,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import theme from "../theme/themeConfig";
import { Question } from "./components";
import { QuestionType } from "./components/question";

const questions: QuestionType[] = [
  {
    title: "Why VIM?",
    answer: {
      type: "short-answer",
      inputProps: {
        name: "why-vim",
      },
    },
  },
  {
    title: "Why Modal Editor?",
    answer: {
      type: "long-answer",
      inputProps: {
        name: "why-modal-editor",
      },
    },
  },
  {
    title: "Select Your prefered Modal Editor",
    answer: {
      type: "option-answer",
      options: ["Vim", "Helix", "Emacs"],
      inputProps: {
        name: "preferred-modal-editor",
      },
    },
  },
];

export default function Home() {
  const [form] = Form.useForm();

  return (
    <ConfigProvider theme={theme}>
      <Layout className="layout">
        <Layout.Header>
          <Typography.Title level={3} style={{ color: "white" }}>
            Create a new form
          </Typography.Title>
        </Layout.Header>
        <Layout.Content className="container">
          <Form
            style={{
              width: "100%",
              maxWidth: 450,
            }}
            form={form}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {questions.map((question) => (
                <Question key={question.title} {...question} />
              ))}

              <Space direction="horizontal">
                <Button
                  htmlType="reset"
                  type="default"
                  onClick={() => form.resetFields()}
                >
                  Reset
                </Button>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Space>
            </Space>
          </Form>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
