import { useCallback, useMemo, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Stack } from '@mui/material';
import { ToolbarItem } from '@my-workspace/packages-interfaces';
import { Button, Box } from '@my-workspace/packages-atoms';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloseableButton } from '@my-workspace/packages-molecules';
import { SortableItem } from "./sortable-item"

const EditorToolbar = ({
  items,
  handleDragEnd,
}: {
  items: Array<ToolbarItem>;
  handleDragEnd?: (data: Array<ToolbarItem>) => void;
  headTitle?: string;
}) => {
  const [listItems, setListItems] = useState<Array<ToolbarItem>>(items);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleOnDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) {
        return;
      }

      const { id: activeId = '' } = active || {};
      const { id: overId = '' } = over || {};

      if (activeId !== overId) {
        setListItems((items) => {
          const oldIndex = items.findIndex((item) => item?.id === activeId);
          const newIndex = items.findIndex((item) => item?.id === overId);

          const listItemsAfterDragEnd = arrayMove(items, oldIndex, newIndex);

          if (handleDragEnd) {
            handleDragEnd(listItemsAfterDragEnd);
          }
          return listItemsAfterDragEnd;
        });
      }
    },
    [items]
  );

  const memoizedListItems = useMemo(() => {
    return listItems.map((singleListItem, index) => {
      const {
        id = index,
        label = '',
        icon,
        url = '',
        renderer,
      } = singleListItem;
      return (
        <SortableItem
          key={index}
          id={id}
          label={label}
          url={url}
          icon={icon}
          renderer={renderer}
        />
      );
    });
  }, [listItems]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleOnDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext
        items={listItems}
        strategy={horizontalListSortingStrategy}
      >
        <Stack
          width="100%"
          overflow="auto"
          direction="row"
          borderRadius={1.5}
          border="1px solid"
          borderColor="common.white"
          p={1}
          columnGap={1.5}
        >
          {memoizedListItems}
        </Stack>
      </SortableContext>
    </DndContext>
  );
};

export { EditorToolbar };
