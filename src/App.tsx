import { useEffect, useRef, useState } from 'react'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import chosePoorlyImage from './assets/youchosepoorly.jpg'
import './App.css'
import confetti from 'canvas-confetti'

function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const [randomIndex, setRandomIndex] = useState<number | null>(null);
  const [randomIndex20, setRandomIndex20] = useState<number | null>(null);
  const [decoysClicked, setDecoysClicked] = useState(new Set());

  const phrases = [
    "Open your gift for a special suprise!",
    "Definitely not best man material",
    "Bottom of leaderboard",
    "Peaked in High School",
    "One twin is definitely uglier",
    "Your mom definitely has a favorite",
    "Its a little birthday present, get it?",
    "What happened?",
    "Midlife crisis starts in 3… 2…",
    "Open it and reveal your final form (disappointment)",
    "Noah raw-dogs ketchup packets",
    "Matthew eats a bowl of Cheetos with cheese",
    "WHICH ONE IS IT??? CHOOSE WISELY",
    "HOW ABOUT NOW???",
    "Why?",
    "Disney adults",
    "They mark Hispanic on on forms but immediately ask where the mayo is",
    "You're closer to 40 now than to 20",
    "They were supposed to be triplets, but one clearly ate the third"
  ]

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 4));
    setRandomIndex20(Math.floor(Math.random() * 20));

  }, [])

  const triggerConfetti = () => {
    var middleFinger = middleFingerRef.current;
    if (!middleFinger) return;

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
    console.log('handle click');
    const gift = giftRef.current;
    const middleFinger = middleFingerRef.current;
    const phrase = phraseRef.current;
    if (!gift || !middleFinger || !phrase) {
      return;
    }
    setClickCount(prev => prev + 1);
    setDecoysClicked(new Set  ())
    console.log(`clickcount ${clickCount}`)
    if (clickCount < 30) {
      moveGift();
    } else {
      gift.style.display = 'none';
      phrase.style.display = 'none';
      middleFinger.classList.remove('hidden');
      triggerConfetti();
    }
  }

  const handleDecoy = (index: number) => {
    setDecoysClicked(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }

  return (
    <div>
      <div ref={phraseRef} className='flex flex-col items-center'>
        <span className='text-2xl md:text-3xl lg:text-4xl'>{phrases[clickCount]}</span>
      </div>
      {clickCount !== 12 && clickCount != 13 && (
        <div className='flex space-between flex-wrap justify-center mt-16'>
          <img
            id="gift"
            ref={giftRef} src={giftImage}
            onClick={handleClick}
            className={`animate-bounce invisble transition-all duration-300 ease-in-out scale-100 absolute ${clickCount == 0 ? '' : 'absolute'} ${clickCount === 6 ? 'w-8 h-8' : 'w-32 h-32'}`} />
        </div>
      )}
      <div ref={middleFingerRef} className='flex flex-col items-center hidden'>
        <span className='text-2xl md:text-3xl lg:text-4xl font-bold mb-8'>Happy 30th Birthday Fuckers!</span>
        <img id="middle-finger" src={middleFingerImage} className='w-64' />
      </div>
      {clickCount === 12 && (
        <div className='flex space-between flex-wrap justify-center  mt-16'>
          {[0, 1, 2, 3].map((_, i) => (
            <img
              key={i}
              ref={giftRef}
              src={decoysClicked.has(i) ? chosePoorlyImage : giftImage}
              className="animate-bounce transition-all duration-300 ease-in-out scale-100 w-32 h-32"
              onClick={i === randomIndex ? handleClick : () => handleDecoy(i)}
            />
          ))}
        </div>
      )}
      {clickCount === 13 && (
        <div className='flex space-between flex-wrap justify-center  mt-16'>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((_, i) => (
            <img
              key={i}
              ref={giftRef}
              src={decoysClicked.has(i) ? chosePoorlyImage : giftImage}
              className="animate-bounce transition-all duration-300 ease-in-out scale-100 w-16 h-16"
              onClick={i === randomIndex20 ? handleClick : () => handleDecoy(i)}
            />
          ))}
        </div>
      )}

    </div>
  )
}

export default App


