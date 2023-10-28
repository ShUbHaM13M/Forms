import type { PropsWithChildren } from "react";
import { DragOverlay, defaultDropAnimationSideEffects } from "@dnd-kit/core";
import type { DropAnimation } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

interface Props {}

export default function SortableOverlay({
  children,
}: PropsWithChildren<Props>) {
  return (
    <DragOverlay
      adjustScale
      modifiers={[restrictToParentElement]}
      dropAnimation={dropAnimationConfig}
    >
      {children}
    </DragOverlay>
  );
}
