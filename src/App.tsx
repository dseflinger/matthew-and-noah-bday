import { useEffect, useRef, useState } from 'react'
import giftImage from './assets/present.png'
import './App.css'
import confetti from 'canvas-confetti'
import { PhraseType, type MultiGiftPhrase } from './types/Phrase'
import Multibox from './components/Multibox'
import useRandomGiftMovement from './hooks/useGiftMovement'
import LightSaberDrag from './components/LightSaberDrag'
import useShuffledPhrases from './hooks/usePhrases'
import MattHairAwayDrag from './components/MattHairAway'
import ThrowNoahInPool from './components/ThrowNoahInPool'
import useRandomFinalImage from './hooks/useRandomFinalImage'


function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const moveGift = useRandomGiftMovement(giftRef, phraseRef);
  const { phrases, reshuffle } = useShuffledPhrases();
  const { middleFingerImage, setMiddleFingerImage } = useRandomFinalImage();
  const maxClickCount = phrases.length - 1;

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
  }, [clickCount, moveGift, phrases, maxClickCount])

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
    reshuffle();
    setMiddleFingerImage();
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
          <button className="cursor-pointer mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleReset}>Reset</button>
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
        case PhraseType.MattSad:
          return (
            <MattHairAwayDrag handleClick={handleClick} />
          );
        case PhraseType.NoahPool:
          return (
            <ThrowNoahInPool handleClick={handleClick} />
          );
        default:
          return (
            <div className={`flex space-between flex-wrap justify-center mt-16`} >
              <img
                id="gift"
                ref={giftRef} src={giftImage}
                onClick={handleClick}
                className={`animate-bounce transition-all duration-200 ease-in-out scale-100 cursor-pointer ${clickCount == 0 || phrases[clickCount].isSmall ? '' : 'fixed'} ${phrases[clickCount].isSmall ? 'w-8 h-8' : 'w-32 h-32'}`} />
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


