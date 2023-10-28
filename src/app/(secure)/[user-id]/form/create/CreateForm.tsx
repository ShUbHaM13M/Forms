import { Header, QuestionList, ToolBar, FormMetaCard } from "@/app/_components";
import { useUserService } from "@/app/_services";
import useCreateFormStore from "@/lib/CreateFormStore";
import { Layout, Space } from "antd";
import { useCallback } from "react";

const CreateForm = () => {
  const { currentUser } = useUserService();
  const formData = useCreateFormStore(
    useCallback((state) => state.getFormData, [])
  );
  const onCreateButtonClick = async () => {
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
    <Layout>
      <Header onCreateButtonClick={onCreateButtonClick} />
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
