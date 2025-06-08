export enum PhraseType {
    default,
    multibox,
    lightsaber
}

export interface BasePhrase {
    text: string;
    type: PhraseType;
    isSmall: boolean;
}

export interface MultiGiftPhrase extends BasePhrase {
    boxcount: number;
    type: PhraseType.multibox;
}

export type Phrase = BasePhrase | MultiGiftPhrase;

const createPhrase = (text: string, type: PhraseType = PhraseType.default, isSmall = false): BasePhrase => {
    return { text, type, isSmall };
}

const createMultiPhrase = (text: string, boxcount: number): MultiGiftPhrase => {
    return { text, type: PhraseType.multibox, boxcount, isSmall: false };
}

export const introPhrase: Phrase = createPhrase("Open your gift for a special suprise!");

export const multiboxPhrases = [
    createMultiPhrase("WHICH ONE IS IT??? CHOOSE WISELY", 4),
    createMultiPhrase("HOW ABOUT NOW???", 20),
]

export const otherPhrases: Phrase[] = [
    createPhrase("Definitely not best man material"),
    createPhrase("Bottom of leaderboard"),
    createPhrase("Peaked in High School"),
    createPhrase("One twin is definitely uglier"),
    createPhrase("Your mom definitely has a favorite"),
    createPhrase("Its a little birthday present, get it?", PhraseType.default, true),
    createPhrase("What happened?"),
    createPhrase("Midlife crisis starts in 3… 2…"),
    createPhrase("Open it and reveal your final form (disappointment)"),
    createPhrase("Noah raw-dogs ketchup packets"),
    createPhrase("Matthew eats a bowl of Cheetos with cheese"),
    createPhrase("Why?"),
    createPhrase("Disney adults"),
    createPhrase("They mark Hispanic on on forms but immediately ask where the mayo is"),
    createPhrase("You're closer to 40 now than to 20"),
    createPhrase("They were supposed to be triplets, but one clearly ate the third"),
    createPhrase("one more just to test"),
    createPhrase("KILL THE YOUNGLING. DO IT. DO IT NOW.", PhraseType.lightsaber),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
    createPhrase("TODO"),
]