import { DndContext, type UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Draggable from './Draggable';
import Droppable from './Droppable';
import younglingImage from '../assets/youngling.webp'
import lightsaberImage from '../assets/lightsaber.png'

interface LightSaberProps {
    handleClick: () => void;
}

const LightSaberDrag: React.FC<LightSaberProps> = (props) => {
    const [parent, setParent] = useState<UniqueIdentifier>("");


    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        if (over) {
            setParent(over.id);
            props.handleClick();
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className='flex space-between flex-col gap-8 justify-center items-center mt-16'>
                {!parent ? (
                    <Draggable id="draggable-item">
                        <img src={lightsaberImage} alt="Lightsaber" className="w-48" />
                    </Draggable>
                ) : null}
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
                <Droppable id="drop-zone">
                    <img src={younglingImage} alt="Youngling" className="w-64" />
                </Droppable>
            </div>
        </DndContext>
    )
}

export default LightSaberDrag