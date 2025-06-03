export enum PhraseType {
    default,
    multibox,
    lightsaber
}

export interface BasePhrase {
    text: string;
    type?: PhraseType;
}

export interface MultiGiftPhrase extends BasePhrase {
    boxcount: number;
    type: PhraseType.multibox;
}

type Phrase = BasePhrase | MultiGiftPhrase;


export const phrases: Phrase[] = [
    { text: "Open your gift for a special suprise!" },
    { text: "Definitely not best man material" },
    { text: "Bottom of leaderboard" },
    { text: "Peaked in High School" },
    { text: "One twin is definitely uglier" },
    { text: "Your mom definitely has a favorite" },
    { text: "Its a little birthday present, get it?" },
    { text: "What happened?" },
    { text: "Midlife crisis starts in 3… 2…" },
    { text: "Open it and reveal your final form (disappointment)" },
    { text: "Noah raw-dogs ketchup packets" },
    { text: "Matthew eats a bowl of Cheetos with cheese" },
    { text: "WHICH ONE IS IT??? CHOOSE WISELY", type: PhraseType.multibox, boxcount: 4 },
    { text: "HOW ABOUT NOW???", type: PhraseType.multibox, boxcount: 20 },
    { text: "Why?" },
    { text: "Disney adults" },
    { text: "They mark Hispanic on on forms but immediately ask where the mayo is" },
    { text: "You're closer to 40 now than to 20" },
    { text: "They were supposed to be triplets, but one clearly ate the third" },
    { text: "one more just to test" },
    { text: "KILL THE YOUNGLING. DO IT. DO IT NOW.", type: PhraseType.lightsaber },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
    { text: "TODO" },
]