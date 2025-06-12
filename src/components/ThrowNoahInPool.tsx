import { DndContext, type UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import Draggable from './Draggable';
import Droppable from './Droppable';
import poolImage from '../assets/pool.png'
import noahFallingImage from '../assets/noah_falling.png'

interface LightSaberProps {
    handleClick: () => void;
}

const ThrowNoahInPool: React.FC<LightSaberProps> = (props) => {
    const [parent, setParent] = useState<UniqueIdentifier>("");
    const [brokeNoah, setBrokeNoah] = useState<boolean>(false);

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        if (over) {
            setParent(over.id);
            props.handleClick();
        }
        else {
            setBrokeNoah(true);
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {brokeNoah && (<div className='mt-4'>Oops you broke Noah</div>)}
            <div className='flex space-between flex-col gap-8 justify-center items-center mt-16'>
                {!parent ? (
                    <Draggable id="draggable-item">
                        <img src={noahFallingImage} alt="Noah Falling" className="w-48" />
                    </Draggable>
                ) : null}
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
                <Droppable id="drop-zone">
                    <img src={poolImage} alt="Pool" className="w-64" />
                </Droppable>
            </div>
        </DndContext>
    )
}

export default ThrowNoahInPool