"use client";

import {
  Button,
  Col,
  ConfigProvider,
  FloatButton,
  Layout,
  Row,
  Typography,
} from "antd";
import theme from "../theme/themeConfig";
import { PlusOutlined } from "@ant-design/icons";
import { useFormService, useUserService } from "./_services";
import { useEffect } from "react";
import { FormCard } from "./_components";
import { useRouter } from "next/navigation";

export default function Home() {
  const formService = useFormService();
  const forms = formService.forms;
  const navigation = useRouter();
  const { currentUser, logout } = useUserService();

  useEffect(() => {
    formService.getAllByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onCreateNewFormClick() {
    navigation.push(`${currentUser?.id}/form/create`);
  }

  return (
    <ConfigProvider theme={theme}>
      <Layout className="layout">
        <Layout.Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography.Title level={3} style={{ color: "white" }}>
            Forms
          </Typography.Title>
          <div>
            <Button title="Logout" type="primary" onClick={logout}>
              Logout
            </Button>
          </div>
        </Layout.Header>
        <Layout.Content className="container">
          <Row gutter={[16, 16]}>
            {forms.map((form) => (
              <Col key={form.id} span={12}>
                <FormCard {...form} />
              </Col>
            ))}
          </Row>

          <FloatButton
            shape="square"
            type="primary"
            tooltip="Create new Form"
            icon={<PlusOutlined />}
            onClick={onCreateNewFormClick}
          />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}
