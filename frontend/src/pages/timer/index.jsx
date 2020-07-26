import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

import {
  FaCog
} from 'react-icons/fa';

import UI, {
  Button
} from '../../components/ui';

import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren
} from "react-circular-progressbar";

export default function Timer(){
  const history = useHistory();

  const time_work = parseInt(localStorage.getItem('work')) * 60;
  const time_pause = parseInt(localStorage.getItem('pause')) * 60;
  const steps_section = parseInt(localStorage.getItem('section'));
  
  const [status, setStatus] = useState('stop');
  const [step, setStep] = useState(1);
  const [seconds, setSeconds] = useState(time_work);
  const [percentage, setPercentage] = useState(50);
  const [progressColor, setProgressColor] = useState('green');

  useEffect(() => {
    if(time_work == null || time_pause == null || steps_section == null){
      history.replace('/config');
    }
  }, [time_work, time_pause, steps_section]);

  useEffect(() => {
    setPercentage(100 - ((seconds / time_work) * 100));

    if(seconds > 0){
      setTimeout(() => {
        setSeconds(seconds -1);
      }, 1000);
    }
  }, [seconds]);

  return (
    <Container>
      <Header>
        <h1>Pomodoro</h1>

        <Link to={"/config"}>
          <Button>Config</Button>
        </Link>
      </Header>
      <Wrap>
        <div>
          <CircularProgress
            value={percentage}
            text={`
              ${String(parseInt((seconds/60))).padStart(2, '0')}:${String(parseInt(seconds % 60)).padStart(2, '0')}
            `}
            strokeWidth={1.8}
            background
            backgroundPadding={10}
            styles={buildStyles({
              pathColor: `var(--timer-${progressColor})`,
              trailColor: `var(--background2)`,
            })}
          />
        </div>
        <div>
          <Status color={progressColor}>
            <span>
              Trabalho
            </span>


          </Status>
        </div>
      </Wrap>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background);

  border-radius: 5px;
  /* border: 1px solid rgba(0, 0, 0, 0.8); */

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

  > div {
    /* background-color: red; */
    align-items: center;
    flex-direction: column;
  }

  > div:first-child {
    /* background-color: yellow; */
  }

  @media ${UI.device.tablet} {
    flex-direction: column;
  }
`;

const CircularProgress = styled(CircularProgressbar)`
  width: 325px;
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
  > span {
    font-size: 50px;
    font-weight: 600;
    color: var(--timer-${props => props.color});
  }
`;