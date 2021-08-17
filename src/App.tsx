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
  const [popUp,setPopUp] = useState(bool);
  const [used,setUsed] = useState(num);
  const [placeholder,setPlaceholder] = useState(str);
  const [life, setLife] = useState(num);

  useEffect(() => {
    async function makeShows() {
      let temp = await requests.getShows();
      setShows(temp);
      console.log(shows);
      setPlaceholder(utils.hideLetters(temp[index].name));
      setLoaded(true);
      
    }
    makeShows()
  }, [])


  const handleClick: () => void = () => {
    setHint(true);
    setUsed(used+1);
  }
  const handleClick2: () => void = () => {
    // console.log(guess.toLowerCase())
    if (guess.toLowerCase() === shows[index].name.toLowerCase()) {
      setIndex(index + 1);
      setScore(score + 1);
      setHint(false);
      setRight(right + 1);
      setPlaceholder(utils.hideLetters(shows[index+1].name));
      
    } else {
      setWrong(wrong + 1);
      setLife(life+1);
      if (life > 2) {
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



  if (!loaded) {
    return (
      <div className={'App'}>
        <Spinner animation="border" />
      </div>

    )
  }

  const stats: types.PopUpProps[] = [
    {
      text: 'Right guesses',
      number: right,
      color: '#DE9F4C'

    },
    {
      text: 'Wrong guesses',
      number: wrong,
      color: '#0DB2B2'

    },
    {
      text: 'Hint used',
      number: used,
      color: '#664FA7'

    }
  ]
  
  return (
    <div className="App">
      <div className="header">
        <div>
          <p>{score}</p>
          <Button
            text={'Statistics'}
            clickHandler={handleClick3}
            background={'#DE9F4C'}
          />
        </div>

        <h1>Guess the TV show</h1>
        <div className="heart-container">

        </div>
      </div>
      <div className="main">
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
    </div>
  );
}

export default App;
