import React, { useState, useEffect } from 'react'
import chosePoorlyImage from '../assets/youchosepoorly.jpg'

interface MultiboxProps {
    boxCount: number;
    clickCount: number;
    giftImage: string;
    handleClick: () => void;
}

const getGiftSizeClass = (boxCount: number) => {
    if (boxCount <= 4) return 'w-32 h-32';
    if (boxCount <= 8) return 'w-24 h-24';
    if (boxCount <= 12) return 'w-20 h-20';
    if (boxCount <= 20) return 'w-16 h-16';
    return 'w-12 h-12';
}

const Multibox: React.FC<MultiboxProps> = (props) => {
    const [decoysClicked, setDecoysClicked] = useState(new Set<number>());
    const [realBoxIndex, setRealBoxIndex] = useState<number | null>(null);

    useEffect(() => {
        setRealBoxIndex(Math.floor(Math.random() * props.boxCount));
    }, [props.boxCount, props.clickCount])

    const sizeClass = getGiftSizeClass(props.boxCount);

    const handleDecoy = (index: number) => {
        setDecoysClicked(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
        });
    }

    const handleGiftClick = () => {
        setDecoysClicked(new Set());
        props.handleClick();
    }

    return (
        <div className='flex space-between flex-wrap justify-center mt-16'>
            {Array.from({ length: props.boxCount }, (_, index) => index).map((_, i) => (
                <img
                    key={`${props.clickCount}-${i}`}
                    src={decoysClicked.has(i) ? chosePoorlyImage : props.giftImage}
                    className={`animate-bounce transition-all scale-100 cursor-pointer ${sizeClass}`}
                    onClick={i === realBoxIndex ? handleGiftClick : () => handleDecoy(i)}
                />
            ))}
        </div>
    )
}

export default Multibox