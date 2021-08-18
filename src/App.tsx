import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './Components/Button';
import Input from './Components/Input'
import * as requests from './requests/requests';
import Placeholder from './Components/Placeholder';
import * as types from './types/types';
import { Spinner } from 'react-bootstrap';
import PopUp from './Components/PopUp/PopUp';
import * as utils from './utils';
import LifeBar from './Components/LifeBar/LifeBar'
import { ToastContainer, toast } from 'react-toastify';
import useWindowSize from './hooks/useWindowsize';

interface AppProps {
  num?: number,
  arr?: [],
  bool?: boolean,
  str?: string,
}



const App: React.FC<AppProps> = ({ str = '', num = 0, arr = [], bool = false }) => {
  const [score, setScore] = useState(num);
  const [shows, setShows]: any = useState(arr);
  const [index, setIndex] = useState(num);
  const [loaded, setLoaded] = useState(bool);
  const [guess, setGuess] = useState(str);
  const [hint, setHint] = useState(bool);
  const [right, setRight] = useState(num);
  const [wrong, setWrong] = useState(num);
  const [popUp, setPopUp] = useState(bool);
  const [used, setUsed] = useState(num);
  const [placeholder, setPlaceholder] = useState(str);
  const [life, setLife] = useState(num);
  const windowSize = useWindowSize();

  const notifySucces = (str: string) => toast.success(str, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  const notifyError = (str: string) => toast.error(str, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });


  useEffect(() => {
    async function makeShows() {
      let temp = await requests.getShows();
      setShows(temp);
      console.log(shows);
      if (temp.length === 0) {
        notifyError('network error');
      } else {
        console.log(windowSize[0]);
        setPlaceholder(utils.hideLetters(temp[index].name));
        setLoaded(true);
      }
    }
    makeShows()
  }, [])



  const handleClick: () => void = () => {
    setHint(true);
    setUsed(used + 1);
  }
  const handleClick2: () => void = () => {
    // console.log(guess.toLowerCase())
    if (guess.toLowerCase() === shows[index].name.toLowerCase()) {
      setIndex(index + 1);
      setScore(score + 1);
      setHint(false);
      setRight(right + 1);
      setPlaceholder(utils.hideLetters(shows[index + 1].name));
      notifySucces('nice!');

    } else {
      setWrong(wrong + 1);
      setLife(life + 1);
      notifyError('wrong...');
      if (life > 1) {
        notifyError('You Lose...');
        resetGame();
      }
    }
  }
  const handleClick3: () => void = () => {
    if (popUp) {
      setPopUp(false);
    } else {
      setPopUp(true);
    }
  }

  const resetGame = () => {
    setIndex(0);
    setScore(0);
    setHint(false);
    setPlaceholder(utils.hideLetters(shows[0].name));
    setLife(0);
  }
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setGuess((e.target as HTMLInputElement).value);
  }



  const stats: types.PopUpProps[] = [
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
  ]

  if (!loaded) {
    return (
      <div className={'app'}>
        <Spinner animation="border" />
      </div>

    )
  }


  const statContainer = 
  <div className='stat-container'>
    <p>{score}</p>
    <Button
      text={'Statistics'}
      clickHandler={handleClick3}
      background={'#DE9F4C'}
    />
  </div>



  return (
    <div className="app">
      <div className="header">
        {windowSize[0] > 640 ? statContainer : ''}

        <h1>Guess the TV show</h1>
        <LifeBar num={life} />
      </div>
      <div className="main">
      {windowSize[0] < 640 ? statContainer : ''}
        <Placeholder text={placeholder} />
        <Input InputHandler={handleInput} />
        <div className="btn-container">
          <Button
            text={'Check the guess'}
            clickHandler={handleClick2}
            background={'#0DB2B2'}
          />
          <Button
            text={'Hint'}
            clickHandler={handleClick}
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
        clickHandler={handleClick3}
      />
      <ToastContainer />
    </div>
  );
}

export default App;
