"use client";

import { useUserService } from "@/app/_services";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import { useCallback } from "react";
const { Title } = Typography;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const userService = useUserService();

  const onFinish = useCallback(async (values: FieldType) => {
    if (!values.email || !values.password) return;
    await userService.login(values.email, values.password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 420,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title>Forms</Title>
        </div>
        <Form<FieldType>
          name="sign-up"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <a
            style={{ float: "right" }}
            className="login-form-forgot"
            href="/password-reset"
          >
            Forgot password
          </a>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Sign up
            </Button>
            <span
              style={{
                fontSize: 12,
                fontWeight: 300,
                marginTop: 8,
              }}
            >
              <span style={{ color: "#ff4d4f", fontWeight: 600 }}>*</span> A new
              account will be created if not registered already
            </span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
