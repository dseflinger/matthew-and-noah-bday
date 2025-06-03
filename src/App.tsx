import { useEffect, useRef, useState } from 'react'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import chosePoorlyImage from './assets/youchosepoorly.jpg'
import younglingImage from './assets/youngling.webp'
import lightsaberImage from './assets/lightsaber.png'
import './App.css'
import confetti from 'canvas-confetti'
import { DndContext } from '@dnd-kit/core'
import Draggable from './Draggable'
import Droppable from './Droppable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

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
const maxClickCount = 30;

function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [decoysClicked, setDecoysClicked] = useState(new Set());
  const [parent, setParent] = useState(null);

  const phrases: Phrase[] = [
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

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 4));

    if (clickCount < maxClickCount) {
      moveGift();

      var currentPhrase = phrases[clickCount];
      if (currentPhrase.type === PhraseType.multibox) {
        const boxcount = (currentPhrase as MultiGiftPhrase).boxcount;
        setRandomIndex(Math.floor(Math.random() * boxcount));
      }
    }
    else {
      triggerConfetti();
    }
  }, [clickCount])

  const triggerConfetti = () => {
    console.log("before confetti")
    var middleFinger = middleFingerRef.current;
    if (!middleFinger) return;
    middleFinger.classList.remove('hidden');
    console.log("after confetti")

    const rect = middleFinger.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    confetti({
      origin: {
        x: centerX / window.innerWidth,
        y: centerY / window.innerHeight,
      },
      particleCount: 200,
      spread: 70
    });

  }

  const moveGift = () => {
    var gift = giftRef.current;
    var phrase = phraseRef.current;
    if (!gift || !phrase) return;

    const phraseRect = phrase.getBoundingClientRect();
    const giftWidth = gift.offsetWidth;
    const giftHeight = gift.offsetHeight;
    const maxX = window.innerWidth - giftWidth;
    const maxY = window.innerHeight - giftHeight;
    let randomX, randomY;
    do {
      randomX = Math.random() * maxX;
      randomY = Math.random() * maxY;
    } while (
      phrase &&
      randomX + giftWidth > phraseRect.left &&
      randomX < phraseRect.right &&
      randomY + giftHeight > phraseRect.top &&
      randomY < phraseRect.bottom
    );
    gift.style.left = `${randomX}px`;

    gift.style.top = `${randomY}px`;
  }
  const handleClick = () => {
    setDecoysClicked(new Set());
    setClickCount(prev => prev + 1);
  }

  function getGiftSizeClass(boxCount: number) {
    if (boxCount <= 4) return 'w-32 h-32';
    if (boxCount <= 8) return 'w-24 h-24';
    if (boxCount <= 12) return 'w-20 h-20';
    if (boxCount <= 20) return 'w-16 h-16';
    return 'w-12 h-12';
  }

  const handleDecoy = (index: number) => {
    setDecoysClicked(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }


  function handleDragEnd({ over }: any) {
    if (over) {
      setParent(over.id);
      handleClick();
    }
  }

  const renderPhraseContent = () => {
    if (clickCount < maxClickCount) {
      return (
        <div ref={phraseRef} className='flex flex-col items-center'>
          <span className='text-2xl md:text-3xl lg:text-4xl'>{phrases[clickCount].text}</span>
        </div>
      );
    }
  }

  const renderMiddleFingerContent = () => {
    if (clickCount == maxClickCount) {
      return (
        <div ref={middleFingerRef} className='flex flex-col items-center'>
          <span className='text-2xl md:text-3xl lg:text-4xl font-bold mb-8'>Happy 30th Birthday Fuckers!</span>
          <img id="middle-finger" src={middleFingerImage} className='w-64' />
        </div>
      );
    }
  }

  const renderContent = () => {
    if (clickCount < maxClickCount) {

      switch (phrases[clickCount].type) {
        case PhraseType.multibox:
          var phrase = phrases[clickCount] as MultiGiftPhrase;
          var boxcount = phrase.boxcount;
          const sizeClass = getGiftSizeClass(boxcount);
          return (
            <div className='flex space-between flex-wrap justify-center mt-16'>
              {Array.from({ length: boxcount }, (_, index) => index).map((_, i) => (
                <img
                  key={`${clickCount}-${i}`}
                  src={decoysClicked.has(i) ? chosePoorlyImage : giftImage}
                  className={`animate-bounce transition-all scale-100 ${sizeClass}`}
                  onClick={i === randomIndex ? handleClick : () => handleDecoy(i)}
                />
              ))}
            </div>
          );
        case PhraseType.lightsaber:
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
          );
        default:
          return (
            <div className='flex space-between flex-wrap justify-center mt-16'>
              <img
                id="gift"
                ref={giftRef} src={giftImage}
                onClick={handleClick}
                className={`animate-bounce invisble transition-all duration-300 ease-in-out scale-100 ${clickCount == 0 || clickCount == 6 ? '' : 'absolute'} ${clickCount === 6 ? 'w-8 h-8' : 'w-32 h-32'}`} />
            </div>
          );
      }
    }
  };

  return (
    <div>
      {renderPhraseContent()}
      {renderMiddleFingerContent()}
      {renderContent()}
    </div>
  )
}

export default App


