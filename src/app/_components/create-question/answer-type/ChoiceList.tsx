import { CloseOutlined } from "@ant-design/icons";
import { Space, Input, Row, Col, Button, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { SortableList } from "../..";
import { UniqueIdentifier } from "@dnd-kit/core";
import { uuidv4 } from "../../sortable-list/utils";
import useCreateFormStore from "@/lib/CreateFormStore";

type ChoiceOptionType = {
  id: UniqueIdentifier;
  label: string;
};

interface ChoiceListProps {
  ChoiceType: React.ReactNode;
  questionIndex: number;
}

const ChoiceList = ({ ChoiceType, questionIndex }: ChoiceListProps) => {
  const _options = useCreateFormStore(
    (state) => state.questions[questionIndex]?.answerOptions
  );

  const _updateOptions = useCreateFormStore(
    (state) => state.updateQuestionOptions
  );

  const [options, setOptions] = useState<ChoiceOptionType[]>(
    _options?.choices || [
      {
        id: uuidv4(),
        label: "Option 1",
      },
    ]
  );
  const [otherAdded, setOtherAdded] = useState<boolean>(_options?.showOthers);

  useEffect(() => {
    _updateOptions(questionIndex, {
      choices: options,
      showOthers: otherAdded,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, otherAdded]);

  const onOptionLabelChange = useCallback((label: string, index: string) => {
    setOptions((prev) =>
      prev.map((value) => {
        if (value.id === index) value.label = label;
        return value;
      })
    );
  }, []);

  const onRemoveOption = (index: string) => {
    setOptions((prev) => prev.filter((item) => item.id != index));
  };

  const onAddOption = useCallback(() => {
    setOptions((prev) => {
      const label = `Option ${prev.length + 1}`;
      return [...prev, { id: uuidv4(), label }];
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <SortableList<ChoiceOptionType>
        items={options}
        onChange={setOptions}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <Row style={{ alignItems: "center", flex: 1 }} gutter={8}>
              <Col flex="none" className="hide-on-hover">
                {ChoiceType}
              </Col>
              <Col flex="auto">
                <Input
                  onChange={(e) =>
                    onOptionLabelChange(
                      e.currentTarget.value,
                      item.id as string
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onAddOption();
                  }}
                  value={item.label}
                />
              </Col>
              {options.length > 1 ? (
                <Col flex="none">
                  <Tooltip title="remove" trigger="hover">
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={() => onRemoveOption(item.id as string)}
                    />
                  </Tooltip>
                </Col>
              ) : null}
            </Row>
            <SortableList.DragHandle />
          </SortableList.Item>
        )}
      />

      {otherAdded ? (
        <Row style={{ alignItems: "center" }} gutter={8}>
          <Col flex="none">{ChoiceType}</Col>
          <Col flex="auto">
            <Input placeholder="Other..." disabled />
          </Col>
          <Col flex="none">
            <Tooltip title="remove" trigger="hover">
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setOtherAdded(false)}
              />
            </Tooltip>
          </Col>
        </Row>
      ) : null}

      <Row style={{ alignItems: "center" }} gutter={8}>
        <Col flex="none">{ChoiceType}</Col>
        <Col flex="auto">
          <Space>
            <Button type="dashed" onClick={onAddOption}>
              Add another option
            </Button>
            {otherAdded ? null : (
              <>
                <span>or</span>
                <Button
                  onClick={() => setOtherAdded(true)}
                  size="small"
                  style={{ paddingInline: 0 }}
                  type="link"
                >
                  add &quot;Other&quot;
                </Button>
              </>
            )}
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ChoiceList;
