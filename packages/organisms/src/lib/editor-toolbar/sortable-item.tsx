import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ToolbarItem } from '@my-workspace/packages-interfaces';
import { Box } from '@my-workspace/packages-atoms';
import { CloseableButton } from '@my-workspace/packages-molecules';

const SortableItem = ({ id, label = '', icon, url, renderer }: ToolbarItem) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? 'transform 0.2s ease',
  };

  return (
    // Note: here two div component wrapper is required to work drag and drop, the mui box component with div variant will not work
    <div>
      <div style={style} {...attributes} ref={setNodeRef} {...listeners}>
        <Box sx={{ cursor: 'pointer' }}>
          {renderer ? (
            renderer()
          ) : (
            <CloseableButton
              icon={icon}
              label={label}
              url={url}
              active={true}
              onClose={() => {
                // add close action here
              }}
            />
          )}
        </Box>
      </div>
    </div>
  );
};

export { SortableItem };
