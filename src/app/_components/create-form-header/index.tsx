import { Layout, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import useCreateFormStore from "../../../lib/CreateFormStore";
import { useUserService } from "@/app/_services";

const Header = () => {
  const { currentUser } = useUserService();
  const formData = useCreateFormStore(
    useCallback((state) => state.getFormData, [])
  );
  // FIXME: Move the submit handler to parent function
  const handleOnCreateClicked = async () => {
    if (!currentUser) {
      console.error("Current User Not found");
    }
    const res = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify({ ...formData(), user_id: currentUser?.id }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
    // FIXME: Error handling
    console.log("Error: ");
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
