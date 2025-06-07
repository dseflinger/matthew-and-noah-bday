import { useCallback } from "react";

const useGiftMovement = (giftRef: React.RefObject<HTMLImageElement | null>, phraseRef: React.RefObject<HTMLDivElement | null>) => {
    return useCallback(() => {
        const gift = giftRef?.current;
        const phrase = phraseRef?.current;
        if (!gift || !phrase) return;

        const phraseRect = phrase.getBoundingClientRect();

        const giftWidth = gift.offsetWidth;
        const giftHeight = gift.offsetHeight;
        const buffer = 12;
        const mobilePadding = 40;

        const maxX = window.innerWidth - giftWidth - buffer;
        const maxY = window.innerHeight - giftHeight - buffer - mobilePadding;

        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;
            attempts++;
        } while (
            randomX + giftWidth > phraseRect.left &&
            randomX < phraseRect.right &&
            randomY + giftHeight > phraseRect.top &&
            randomY < phraseRect.bottom &&
            attempts < maxAttempts
        );

        gift.style.left = `${randomX}px`;
        gift.style.top = `${randomY}px`;
    }, [giftRef, phraseRef]);
}
export default useGiftMovement;
