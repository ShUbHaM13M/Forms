import { FontSizeOutlined, PlusOutlined } from "@ant-design/icons";
import { Affix, Button, Space, Tooltip } from "antd";

const ToolBar = () => {
  return (
    <Affix className="tooltip-container" offsetTop={window.innerHeight * 0.5}>
      <Space.Compact direction="vertical">
        <Tooltip placement="right" title="Add question">
          <Button size="large" icon={<PlusOutlined />} />
        </Tooltip>

        <Tooltip placement="right" title="Add title and description">
          <Button size="large" icon={<FontSizeOutlined />} />
        </Tooltip>
      </Space.Compact>
    </Affix>
  );
};

export default ToolBar;
