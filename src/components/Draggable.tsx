import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';


function Draggable({ id, children }: { id: string, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        touchAction: 'none',
        cursor: 'grab',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
}

export default Draggable;
