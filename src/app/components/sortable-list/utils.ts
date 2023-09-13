import { CSS } from "@dnd-kit/utilities";
import {
  AnimateLayoutChanges,
  NewIndexGetter,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableTransition } from "@dnd-kit/sortable/dist/hooks/types";

export const defaultNewIndexGetter: NewIndexGetter = ({
  id,
  items,
  activeIndex,
  overIndex,
}) => arrayMove(items, activeIndex, overIndex).indexOf(id);

export const defaultAnimateLayoutChanges: AnimateLayoutChanges = ({
  containerId,
  isSorting,
  wasDragging,
  index,
  items,
  newIndex,
  previousItems,
  previousContainerId,
  transition,
}) => {
  if (!transition || !wasDragging) {
    return false;
  }

  if (previousItems !== items && index === newIndex) {
    return false;
  }

  if (isSorting) {
    return true;
  }

  return newIndex !== index && containerId === previousContainerId;
};

export const defaultTransition: SortableTransition = {
  duration: 200,
  easing: "ease",
};

export const transitionProperty = "transform";

export const disabledTransition = CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: "linear",
});

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
