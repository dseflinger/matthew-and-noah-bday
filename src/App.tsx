import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
// import giftImage from './assets/undraw_happy-birthday_lmk0.svg'
import giftImage from './assets/present.png'
import middleFingerImage from './assets/colbert_middle.gif'
import viteLogo from '/vite.svg'
import './App.css'
import confetti from 'canvas-confetti'

function App() {
  const [count, setCount] = useState(0)
  const giftRef = useRef<HTMLImageElement>(null)
  const middleFingerRef = useRef<HTMLImageElement>(null)
  let clickCount = 0;

  useEffect(() => {

    // todo figure out why its called twice
    var gift = giftRef.current;
    var middleFinger = middleFingerRef.current;
    if (!gift) {
      alert("no gift element");
      return;
    }

    // (function () {
    //   const runConfetti = document.querySelector('#hs-run-on-click-run-confetti');
    //   if (!runConfetti) return;
    //   runConfetti.addEventListener('click', () => {
    //     confetti({
    //       particleCount: 100,
    //       spread: 70,
    //       origin: {
    //         y: 0.6
    //       }
    //     });
    //   });
    // })();

    const triggerConfetti = () => {
      if (!middleFinger) return;

      const rect = middleFinger.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      confetti({
        origin: {
          x: centerX / window.innerWidth,
          y: centerY / window.innerHeight,
        },
      });

    }

    const moveGift = () => {
      if (!gift) return;
      console.log("gift clicked!");
      const giftWidth = gift.offsetWidth
      const giftHeight = gift.offsetHeight
      const maxX = window.innerWidth - giftWidth;
      const maxY = window.innerHeight - giftHeight;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      gift.style.left = `${randomX}px`;

      gift.style.top = `${randomY}px`;

      // giftElement.style.setProperty("--rando", `${Math.floor(Math.random() * 20) + 1}px`); // inject the CSS with JavaScript
    }
    const handleClick = () => {
      if (!gift || !middleFinger) return;
      clickCount++;
      if (clickCount < 5) {
        moveGift();
      } else {
        // alert("30 times!");
        gift.style.display = 'none';
        middleFinger.style.visibility = 'visible';
        triggerConfetti();
      }
    }
    gift.addEventListener('click', handleClick);

    return () => {
      if (!gift) return;
      gift.removeEventListener('click', handleClick);
    };

  }, [])

  return (
    <>
      {/* <img id="gift" ref={giftRef} src={giftImage} className='w-32 h-32 absolute bg-white animate-bounce' /> */}
      <img id="hs-run-on-click-run-confetti" ref={giftRef} src={giftImage} className='w-32 h-32 absolute animate-bounce' />
      <img id="hs-run-on-click-run-confetti" ref={middleFingerRef} src={middleFingerImage} className='w-32 invisible' />
      {/* <button id="hs-run-on-click-run-confetti" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" type="button">Run Confetti</button> */}
      {/* <div id="gift" ref={giftRef} className='bg-red-400 w-32 h-32 absolute'></div> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className='bg-red-300'>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App


