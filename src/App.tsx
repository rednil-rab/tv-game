import React, { useEffect, useState, useRef } from 'react';

// components
import Button from 'Components/Button';
import Input from 'Components/Input';
import Placeholder from 'Components/Placeholder';
import { Spinner } from 'react-bootstrap';
import PopUp from 'Components/PopUp/PopUp';
import LifeBar from 'Components/LifeBar/LifeBar';

// requests
import { getShows } from 'requests/requests';

// utils
import { 
  setToLocalStorage,
  getFromLocalStorage,
  hideLetters
} from 'utils';

// toast
import { ToastContainer, toast } from 'react-toastify';

// hooks
import useWindowSize from 'hooks/useWindowsize';

// css
import 'App.css';

// types
import { Show, PopUpProps } from 'types/types';

interface AppProps {
  num?: number,
  arr?: [],
  bool?: boolean,
  str?: string,
}

// constants

const RIGHT = 'right';
const WRONG = 'wrong';
const USED = 'used';


// functions
const notifySucces = (str: string) => toast.success(str, {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const notifyError = (str: string) => toast.error(str, {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});


const App: React.FC<AppProps> = () => {

  // state
  const [right, setRight] = useState(getFromLocalStorage(RIGHT));
  const [wrong, setWrong] = useState(getFromLocalStorage(WRONG));
  const [used, setUsed] = useState(getFromLocalStorage(USED));
  const [score, setScore] = useState(0);
  const [shows, setShows] = useState<Show[]>([]);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [guess, setGuess] = useState('');
  const [hint, setHint] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [life, setLife] = useState(0);
  const windowSize = useWindowSize();

  // ref
  const guessRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    async function makeShows() {
      const temp = await getShows();
      setShows(temp);
      
      if (temp.length === 0) {
        notifyError('network error');
      } else {
        setPlaceholder(hideLetters(temp[index].name));
        setLoaded(true);
      }
    }
    makeShows();
  }, []);



  const handleClickHint: () => void = () => {
    setHint(true);
    setUsed(used + 1);
    setToLocalStorage(USED, used+1);
  };

  const handleClickGuess: () => void = () => {
    // console.log(guess.toLowerCase())
    if (guess.toLowerCase() === shows[index].name.toLowerCase()) {
      setIndex(index + 1);
      setScore(score + 1);

      setHint(false);
      setRight(right + 1);
      setToLocalStorage(RIGHT, right+1);
      setPlaceholder(hideLetters(shows[index + 1].name));
      if (guessRef.current) {
        guessRef.current.value = '';
      }
      
      if (index >= shows.length) {
        setIndex(0);
        notifySucces('You did it!');
      }
      notifySucces('nice!');
    } else {
      const updatedWrong = wrong + 1;
      setWrong(updatedWrong);
      setToLocalStorage(WRONG, updatedWrong);
      setLife(life + 1);
      notifyError('wrong...');
      if (life > 1) {
        notifyError('You Lose...');
        resetGame();
      }
    }
  };

  const handleClickPopUp: () => void = () => {
    if (popUp) {
      setPopUp(false);
    } else {
      setPopUp(true);
    }
  };

  const resetGame = () => {
    setIndex(0);
    setScore(0);
    setHint(false);
    setPlaceholder(hideLetters(shows[0].name));
    setLife(0);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setGuess((e.target as HTMLInputElement).value);
  };



  const stats: PopUpProps[] = [
    {
      text: 'Right guesses',
      num: right,
      color: '#DE9F4C'

    },
    {
      text: 'Wrong guesses',
      num: wrong,
      color: '#0DB2B2'

    },
    {
      text: 'Hint used',
      num: used,
      color: '#664FA7'

    }
  ];

  if (!loaded) {
    return (
      <div className={'app'}>
        <Spinner animation="border" />
      </div>

    );
  }

  return (
    <div className="app">
      <div className="header">
        {windowSize[0] > 640 ? (
          <div className="stat-container">
            <p>{score}</p>
            <Button
              text={'Statistics'}
              clickHandler={handleClickPopUp}
              background={'#DE9F4C'}
            />
          </div>
        ) : ''}
        
        <h1>Guess the TV show</h1>
        <LifeBar num={life} />
      </div>
      <div className="main">
        {windowSize[0] < 640 ? (
          <div className="stat-container">
            <p>{score}</p>
            <Button
              text={'Statistics'}
              clickHandler={handleClickPopUp}
              background={'#DE9F4C'}
            />
          </div>
        ) : ''}
        <Placeholder text={placeholder} />
        <Input InputHandler={handleInput} ref={guessRef} />
        <div className="btn-container">
          <Button
            text={'Check the guess'}
            clickHandler={handleClickGuess}
            background={'#0DB2B2'}
          />
          <Button
            text={'Hint'}
            clickHandler={handleClickHint}
            background={hint ? 'rgb(11 122 122)' : '#0DB2B2'}
          />

        </div>
        <div style={{ opacity: hint ? 1 : 0 }} className="description-container">
          {shows[index].description}
        </div>
      </div>
      <PopUp
        display={popUp}
        stats={stats}
        clickHandler={handleClickPopUp}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
