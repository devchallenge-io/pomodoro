import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import useSound from 'use-sound';

import {
  FaPlay,
  FaPause
} from 'react-icons/fa';

import UI, {
  Button
} from '../../components/ui';

import {
  buildStyles,
  CircularProgressbar
} from "react-circular-progressbar";

import soundEndOfWork from '../../assets/end_of_work.mp3';
import soundEndOfPause from '../../assets/end_of_pause.mp3';
import soundEndOfLongPause from '../../assets/end_of_long_pause.mp3';

export default function Timer(){
  const history = useHistory();
  
  const config = {
    time: {
      work: parseInt(localStorage.getItem('work')) * 60,
      pause: parseInt(localStorage.getItem('pause')) * 60,
      long_pause: (parseInt(localStorage.getItem('pause')) * 5) * 60
    },
    steps: parseInt(localStorage.getItem('section') ?? 0)
  };

  const colors = {
    work: 'var(--timer-green)',
    pause: 'var(--timer-yellow)',
    long_pause: 'var(--timer-cyan)',
    stop: 'var(--timer-red)',

    clear: 'var(--background2)'
  }

  const status_label = {
    work: "Trabalho",
    pause: "Pausa",
    long_pause: "Pausa Longa"
  }

  useEffect(() => {
    if(isNaN(config.time.work) || isNaN(config.time.pause) || config.steps === 0){
      history.replace('/config');
    }
  }, [config.time.work, config.time.pause, config.steps, history]);
  
  const [playSfxEndOfWork] = useSound(soundEndOfWork);
  const [playSfxEndOfPause] = useSound(soundEndOfPause);
  const [playSfxEndOfLongPause] = useSound(soundEndOfLongPause);
  
  const [running, setRunning] = useState(false);  // true, false
  const [status, setStatus] = useState('work');   // 'work', 'short_pause', 'long_pause'
  const [step, setStep] = useState(0);            // 0 ~ ${steps_section}
  const [percentage, setPercentage] = useState(100);
  const [time, setTime] = useState(config.time[status]);    // time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if(running && time > 0)
        setTime(time -1);
    }, 1000);
    return () => clearInterval(interval);
  }, [running, time]);

  useEffect(() => {
    if(running){
      setPercentage(100 - ((time / config.time[status]) * 100));

      if(time === 0){
        setRunning(false);

        if(status === 'work'){
          handleOnFinishWork();

          if(step + 1 >= config.steps){
            setStatus('long_pause');
            setTime(config.time.long_pause);
          }
          else {
            setStatus('pause');
            setTime(config.time.pause);
          }
        }
        else
        if(status === 'pause'){
          handleOnFinishPause();
          setStatus('work');
          setTime(config.time.work);
          setStep(step +1);
        }
        else
        if(status === 'long_pause'){
          handleOnFinishLongPause();
          setStatus('work');
          setTime(config.time.work);
          setStep(0);
        }
      }
    }
    // eslint-disable-next-line
  }, [time, running]);
  
  function handleToggleRun(event){
    setRunning(!running);
    (running ? handleOnPause : handleOnPlay)();
  }
  
  function handleOnPlay(){
    console.log('on play event');
  }

  function handleOnPause(){
    console.log('on pause event');
  }

  function handleOnFinishWork(){
    playSfxEndOfWork();
  }

  function handleOnFinishPause(){
    playSfxEndOfPause();
  }

  function handleOnFinishLongPause(){
    playSfxEndOfLongPause();
  }

  return (
    <Container>
      <Header>
        <h1>Pomodoro</h1>
        <Link to={"/config"}>
          <Button>Config</Button>
        </Link>
      </Header>
      <Wrap>
        <CircularProgress
          value={percentage}
          text={`
            ${String(parseInt((time/60))).padStart(2, '0')}:${String(parseInt(time % 60)).padStart(2, '0')}
          `}
          strokeWidth={1.75}
          background
          backgroundPadding={9}
          styles={buildStyles({
            pathColor: colors[status],
            trailColor: `var(--background2)`,
          })}
        />
        <Status color={colors[status]}>
          <span>
            { status_label[status] }
          </span>
          <div>
            {
              Array(config.steps).fill().map(Math.random).map((key, i) => (
                <StepIndicator key={key} color={
                  i <= step ? colors[status] : colors.clear
                } />
              ))
            }
          </div>
          <Button onClick={handleToggleRun.bind(this)}>
            {running ? (
              <FaPause size={36} />
            ) : (
              <FaPlay size={36} />
            )}
          </Button>
        </Status>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background);

  border-radius: 5px;

  width: 100%;
  max-width: 800px;

  div, header {
    display: flex;
  }
`;

const Header = styled.header`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 75px;

  > h1 {
    font-size: 50px;
  }
`;

const Wrap = styled.div`
  padding: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  > * {
    width: 325px;
  }

  @media ${UI.device.tablet} {
    flex-direction: column;
  }
`;

const CircularProgress = styled(CircularProgressbar)`
  box-shadow: 0 0 10px #40455e;
  border-radius: 50%;

  .CircularProgressbar-background {
    fill: var(--background2);
  }

  .CircularProgressbar-text  {
    fill: var(--foreground);
    dominant-baseline: middle;
    text-anchor: middle;
    font-size: 23px;
    font-weight: 600;
  }
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > span {
    font-size: 50px;
    font-weight: 600;
    color: ${props => props.color};
  }
  
  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 100px;
    padding: 20px 25px;
  }

  > div {
    padding: 10px 5px;
    margin-top: 7.5px;
    margin-bottom: 22px;
  }
`;

const StepIndicator = styled.span`
  background-color: ${props => props.color};

  width: 18px;
  height: 18px;
  border-radius: 50%;

  margin: 0px 5px;
`;