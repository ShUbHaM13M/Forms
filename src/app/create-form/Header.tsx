import { Layout, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import useCreateFormStore from "./CreateFormStore";

const Header = () => {
  const formData = useCreateFormStore(
    useCallback((state) => state.getFormData, [])
  );
  const handleOnCreateClicked = () => {
    console.log(formData());
  };

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
      <Button type="primary" title="Create" onClick={handleOnCreateClicked}>
        Create
      </Button>
    </Layout.Header>
  );
};

export default Header;
