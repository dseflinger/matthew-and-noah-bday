import { useEffect, useRef, useState } from 'react'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import './App.css'
import confetti from 'canvas-confetti'
import { PhraseType, type MultiGiftPhrase } from './types/Phrase'
import Multibox from './components/Multibox'
import useRandomGiftMovement from './hooks/useGiftMovement'
import LightSaberDrag from './components/LightSaberDrag'
import useShuffledPhrases from './hooks/usePhrases'

const maxClickCount = 30;

function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const moveGift = useRandomGiftMovement(giftRef, phraseRef);
  const phrases = useShuffledPhrases();

  useEffect(() => {
    if (clickCount < maxClickCount) {
      const currentPhrase = phrases[clickCount];
      if (currentPhrase.type == PhraseType.default) {
        moveGift();
      }
    }
    else {
      triggerConfetti();
    }
  }, [clickCount, moveGift, phrases])

  const triggerConfetti = () => {
    const middleFinger = middleFingerRef.current;
    if (!middleFinger) return;
    middleFinger.classList.remove('hidden');

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

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  }

  const handleReset = () => {
    setClickCount(0);
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

  const renderLastStepContent = () => {
    if (clickCount == maxClickCount) {
      return (
        <div ref={middleFingerRef} className='flex flex-col items-center'>
          <span className='text-2xl md:text-3xl lg:text-4xl font-bold mb-8'>Happy 30th Birthday Fuckers!</span>
          <img id="middle-finger" src={middleFingerImage} className='w-64' />
          <button onClick={handleReset}>Reset</button>
        </div>
      );
    }
  }

  const renderGiftContent = () => {
    if (clickCount < maxClickCount) {

      switch (phrases[clickCount].type) {
        case PhraseType.multibox: {
          const phrase = phrases[clickCount] as MultiGiftPhrase;
          const boxcount = phrase.boxcount;
          return (
            <Multibox
              boxCount={boxcount}
              clickCount={clickCount}
              giftImage={giftImage}
              handleClick={handleClick}
            />
          );
        }
        case PhraseType.lightsaber:
          return (
            <LightSaberDrag handleClick={handleClick} />
          );
        default:
          return (
            <div className={`flex space-between flex-wrap justify-center mt-16`} >
              <img
                id="gift"
                ref={giftRef} src={giftImage}
                onClick={handleClick}
                className={`animate-bounce transition-all duration-200 ease-in-out scale-100 ${clickCount == 0 || phrases[clickCount].isSmall ? '' : 'fixed'} ${phrases[clickCount].isSmall ? 'w-8 h-8' : 'w-32 h-32'}`} />
            </div>
          );
      }
    }
  };
  return (
    <div>
      {renderPhraseContent()}
      {renderLastStepContent()}
      {renderGiftContent()}
    </div>
  )
}

export default App


