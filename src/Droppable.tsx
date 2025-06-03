import { useDroppable } from '@dnd-kit/core';


function Droppable({ id, children }: { id: string, children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef}>
            {children}
        </div>
    );
}

export default Droppable;
