import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const giftRef = useRef<HTMLDivElement>(null)
  let clickCount = 0;

  // moveGift();
  useEffect(() => {
    // todo figure out why its called twice
    var gift = giftRef.current;
    if (!gift) {
      alert("no gift element");
      return;
    }
    const moveGift = () => {
      if (!gift) return;
      console.log("gift clicked!");
      const giftWidth = gift.offsetWidth
      const giftHeight = gift.offsetHeight
      // alert("clicked gift")
      const maxX = window.innerWidth - giftWidth;
      const maxY = window.innerHeight - giftHeight;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      console.log(`gift left before ${gift.style.left}`);
      gift.style.left = `${randomX}px`;
      console.log(`gift left after ${gift.style.left}`);

      gift.style.top = `${randomY}px`;
      // giftElement.style.setProperty("--rando", `${Math.floor(Math.random() * 20) + 1}px`); // inject the CSS with JavaScript
    }
    gift.addEventListener('click', () => {
      clickCount++;
      if (clickCount < 30) {
        moveGift();
      } else {
        alert("30 times!");
        // gift.style.display = 'none';
        // middleFinger.style.display = 'block';
      }
    });
    // moveGift()

  }, [])

  return (
    <>
      {/* <img id="gift" /> */}
      <div id="gift" ref={giftRef} className='bg-red-400 w-32 h-32 absolute'></div>
      <div>test</div>
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


