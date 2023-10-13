"use client";

import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import theme from "../theme/themeConfig";
import { Question } from "./components";
import { type Question as QuestionType } from "./global";
import { uuidv4 } from "./components/sortable-list/utils";

const questions: QuestionType[] = [
  {
    id: uuidv4(),
    title: "Why VIM?",
    answerType: "short-answer",
    validations: {
      name: "why-vim",
    },
  },
  {
    id: uuidv4(),
    title: "Why Modal Editor?",
    answerType: "long-answer",
    validations: {
      name: "why-modal-editor",
      placeholder: "Enter your answer",
    },
  },
  {
    id: uuidv4(),
    title: "Select Your prefered Modal Editor",
    answerType: "radio-answer",
    answerOptions: {
      choices: [
        { id: uuidv4(), label: "Vim" },
        { id: uuidv4(), label: "Emacs" },
        { id: uuidv4(), label: "VS Code" },
      ],
    },
    validations: {
      name: "preferred-modal-editor",
    },
  },
];

export default function Home() {
  const [form] = Form.useForm();

  return (
    <ConfigProvider theme={theme}>
      <Layout className="layout">
        {/* <Layout.Header>
          <Typography.Title level={3} style={{ color: "white" }}>
            Create a new form
          </Typography.Title>
        </Layout.Header> */}
        <Layout.Content className="container">
          <Form form={form}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {questions.map((question) => (
                <Question key={question.title} question={question} />
              ))}

              <Row gutter={8} justify="end">
                <Col>
                  <Button
                    htmlType="reset"
                    type="default"
                    onClick={() => form.resetFields()}
                  >
                    Reset
                  </Button>
                </Col>
                <Col>
                  <Button htmlType="submit" type="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Space>
          </Form>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
