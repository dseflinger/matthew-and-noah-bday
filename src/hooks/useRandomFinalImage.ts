import { useCallback, useState } from "react";
import colbert from '../assets/colbert_middle.gif'
import ryan from '../assets/ryan_flip.gif'
import rodgers from '../assets/mrrogers_flip.webp'

const choices = [colbert, ryan, rodgers];

const randomFinalImage = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const useRandomFinalImage = () => {
    const [middleFingerImage, setImage] = useState(randomFinalImage);

    const setMiddleFingerImage = useCallback(() => {
        setImage(randomFinalImage);

    }, [])
    return { middleFingerImage, setMiddleFingerImage };
}
export default useRandomFinalImage;