import { DndContext, type UniqueIdentifier, type DragEndEvent } from '@dnd-kit/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import Draggable from './Draggable';
import Droppable from './Droppable';
import mattSuprised from '../assets/Matt_suprised.png';
import mattHappy from '../assets/Matt_happy.png';
import hairImage from '../assets/cartoonhair.png';
import trashCanImage from '../assets/trash_can.png';

interface LightSaberProps {
    handleClick: () => void;
}

const MattHairAwayDrag: React.FC<LightSaberProps> = (props) => {
    const [parent, setParent] = useState<UniqueIdentifier>("");
    const mattRef = useRef<HTMLImageElement>(null);
    const [mattImage, setMattImage] = useState(mattHappy)

    function handleDragEnd(event: DragEndEvent) {
        const { over } = event;
        if (over) {
            setParent(over.id);
            props.handleClick();
        }
        else {
            setMattImage(mattHappy);
        }
    }

    function handleDragStart() {
        setMattImage(mattSuprised);
    }

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex flex-col gap-8 justify-center items-center mt-16">
                <div className="relative w-36" ref={mattRef}>
                    <img
                        src={mattImage}
                        alt="Matt"
                        className="w-36"

                    />
                    {!parent && (
                        <div className="absolute -top-2 left-8">
                            <Draggable id="hair">
                                <div className="w-20 relative">
                                    <img
                                        src={hairImage}
                                        alt="Hair"
                                        className="w-full"
                                    />
                                </div>
                            </Draggable>
                        </div>
                    )}

                </div>

                <FontAwesomeIcon icon={faArrowDown} size="2x" />
                <Droppable id="drop-zone">
                    <img src={trashCanImage} alt="Trash Can" className="w-24" />
                </Droppable>
            </div>
        </DndContext>
    );
};

export default MattHairAwayDrag;
