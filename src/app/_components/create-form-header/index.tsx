import { Layout, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import useCreateFormStore from "../../../lib/CreateFormStore";
import { useUserService } from "@/app/_services";

interface HeaderProps {
  onCreateButtonClick: () => void;
}

const Header = ({ onCreateButtonClick }: HeaderProps) => {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "1em",
      }}
    >
      <Button
        target="_blank"
        href="/"
        type="primary"
        shape="circle"
        icon={<EyeOutlined />}
      />
      <Button type="primary" title="Create" onClick={onCreateButtonClick}>
        Create
      </Button>
    </Layout.Header>
  );
};

export default Header;
