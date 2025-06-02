import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
// import giftImage from './assets/undraw_happy-birthday_lmk0.svg'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from 'canvas-confetti'

function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)

  const phrases = [
    "Open your gift for a special suprise!",
    "Definitely not best man material",
    "Bottom of leaderboard",
    "Peaked in High School",
    "One twin is definitely uglier",
    "Your mom definitely has a favorite",
    "What happened?",
    "Midlife crisis starts in 3… 2…",
    "Open it and reveal your final form (disappointment)",
    "Noah raw-dogs ketchup packets",
    "Matthew eats a bowl of Cheetos with cheese",
    "Why?",
    "Disney adults",
    "They mark Hispanic on on forms but immediately ask where the mayo is",
    "You're closer to 40 now than to 20",
    "They were supposed to be triplets, but one clearly ate the third"
  ]

  useEffect(() => {
    const phrase = phraseRef.current;

    const gift = giftRef.current;

    if (phrase && gift) {
      const phraseRect = phrase.getBoundingClientRect();

      const top = phraseRect.bottom + 32;
      const left = phraseRect.left + (phraseRect.width / 2) - (gift.offsetWidth / 2);

      gift.style.position = 'absolute';
      gift.style.top = `${top}px`;
      gift.style.left = `${left}px`;
      gift.style.visibility = 'visible';
    }

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
    const gift = giftRef.current;
    const middleFinger = middleFingerRef.current;
    const phrase = phraseRef.current;
    if (!gift || !middleFinger || !phrase) {
      // alert('no gift!')
      return;
    }
    setClickCount(prev => prev + 1);
    console.log(`clickcount ${clickCount}`)
    console.log(`clickcount < 5 ${clickCount < 30}`)
    if (clickCount < 30) {
      moveGift();
    } else {
      gift.style.display = 'none';
      phrase.style.display = 'none';
      middleFinger.style.visibility = 'visible';
      triggerConfetti();
    }
  }

  return (
    <>
      <div ref={phraseRef} className='flex flex-col items-center'>
        <span className='text-2xl md:text-3xl lg:text-4xl'>{phrases[clickCount]}</span>
      </div>
      <img id="gift"
        ref={giftRef} src={giftImage}
        onClick={handleClick}
        className='w-32 h-32 absolute animate-bounce invisble transition-all duration-300 ease-in-out scale-100' />
      <img id="middle-finger" ref={middleFingerRef} src={middleFingerImage} className='w-32 invisible' />
    </>
  )
}

export default App


