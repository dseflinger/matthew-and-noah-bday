import { useMemo } from "react";
import { introPhrase, multiboxPhrases, otherPhrases, type Phrase } from "../types/Phrase";

const useShuffledPhrases = () => {

    return useMemo(() => {
        const shuffled = [...otherPhrases];
        for (let i = 0; i < shuffled.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const insertIndex = Math.min(6, shuffled.length);
        const result = [
            introPhrase,
            ...shuffled.slice(0, insertIndex),
            ...multiboxPhrases,
            ...shuffled.slice(insertIndex)
        ];

        return result;
    }, [])
}
export default useShuffledPhrases;