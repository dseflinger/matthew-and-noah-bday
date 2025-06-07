import { useEffect, useRef, useState } from 'react'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import younglingImage from './assets/youngling.webp'
import lightsaberImage from './assets/lightsaber.png'
import './App.css'
import confetti from 'canvas-confetti'
import { DndContext } from '@dnd-kit/core'
import Draggable from './components/Draggable'
import Droppable from './components/Droppable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { phrases, PhraseType, type MultiGiftPhrase } from './types/Phrase'
import Multibox from './components/Multibox'
import useGiftMovement from './hooks/useGiftMovement'


const maxClickCount = 30;

function App() {
  const phraseRef = useRef<HTMLDivElement>(null)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  const [clickCount, setClickCount] = useState(0)
  const [parent, setParent] = useState(null);
  const moveGift = useGiftMovement(giftRef, phraseRef);

  useEffect(() => {
    if (clickCount < maxClickCount) {
      var currentPhrase = phrases[clickCount];
      switch (currentPhrase.type) {
        case PhraseType.multibox:
        case PhraseType.lightsaber:
          break;
        default:
          moveGift();
          break;
      }
    }
    else {
      triggerConfetti();
    }
  }, [clickCount])

  const triggerConfetti = () => {
    var middleFinger = middleFingerRef.current;
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

  const renderLastStepContent = () => {
    if (clickCount == maxClickCount) {
      return (
        <div ref={middleFingerRef} className='flex flex-col items-center'>
          <span className='text-2xl md:text-3xl lg:text-4xl font-bold mb-8'>Happy 30th Birthday Fuckers!</span>
          <img id="middle-finger" src={middleFingerImage} className='w-64' />
        </div>
      );
    }
  }

  const renderGiftContent = () => {
    if (clickCount < maxClickCount) {

      switch (phrases[clickCount].type) {
        case PhraseType.multibox:
          var phrase = phrases[clickCount] as MultiGiftPhrase;
          var boxcount = phrase.boxcount;
          return (
            <Multibox
              boxCount={boxcount}
              clickCount={clickCount}
              giftImage={giftImage}
              handleClick={handleClick}
            />
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
            <div className={`flex space-between flex-wrap justify-center ${clickCount == 0 || clickCount == 6 ? 'mt-16' : ''}`} >
              <img
                id="gift"
                ref={giftRef} src={giftImage}
                onClick={handleClick}
                className={`animate-bounce transition-all duration-200 ease-in-out scale-100 ${clickCount == 0 || clickCount == 6 ? '' : 'absolute'} ${clickCount === 6 ? 'w-8 h-8' : 'w-32 h-32'}`} />
            </div>
          );
      }
    }
  };
  return (
    <>
      <div>
        {renderPhraseContent()}
        {renderLastStepContent()}
      </div>
      {renderGiftContent()}
    </>
  )
}

export default App


