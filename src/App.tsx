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
  initial?: number,
  array?: [],
  bool?: boolean,
  word?: string,
}



const App: React.FunctionComponent<AppProps> = ({ word = 'asafaf', initial = 0, array = [], bool = false }) => {
  const [score, setScore] = useState(initial);
  const [shows, setShows]: any = useState(array);
  const [index, setIndex] = useState(initial);
  const [loaded, setLoaded] = useState(bool);
  const [guess, setGuess] = useState(word);
  const [hint, setHint] = useState(bool);
  const [right, setRight] = useState(initial);
  const [wrong, setWrong] = useState(initial);
  const [popUp,setPopUp] = useState(bool);
  const [used,setUsed] = useState(initial);
  const [placeholder,setPlaceholder] = useState(word);

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
      debugger;
      setPlaceholder(utils.hideLetters(shows[index+1].name));
    } else {
      setWrong(wrong + 1);
    }
  }
  const handleClick3: () => void = () => {
    if (popUp) {
      setPopUp(false);
    } else {
      setPopUp(true);
    }
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
          <h2>{score}</h2>
          <Button
            text={'Statistics'}
            ClickHandler={handleClick3}
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
            ClickHandler={handleClick2}
            background={'#0DB2B2'}
          />
          <Button
            text={'Hint'}
            ClickHandler={handleClick}
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
        ClickHandler={handleClick3}
      />
    </div>
  );
}

export default App;
