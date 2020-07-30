import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import UI, {
  NumberPicker,
  Button as BaseButton
} from '../../components/ui';

export default function Config(){
  const history = useHistory();

  const [work, setWork] = useState(
    localStorage.getItem('work') ?? 25
  );

  const [pause, setPause] = useState(
    localStorage.getItem('pause') ?? 5
  );

  const [section, setSection] = useState(
    localStorage.getItem('section') ?? 4
  );

  function handleContinue(){
    localStorage.setItem('work', work);
    localStorage.setItem('pause', pause);
    localStorage.setItem('section', section);

    history.replace('/');
  }

  return (
    <Container>
      <Title>Pomodoro</Title>

      <NumberPickerContainer>
        <NumberPicker 
          value={work}
          onChange={e => setWork(e.value)}
          min={10} max={60}>
          Trabalho
        </NumberPicker>

        <NumberPicker
          value={pause}
          onChange={e => setPause(e.value)}
          min={1} max={25}>
          Pausa
        </NumberPicker>

        <NumberPicker
          value={section}
          onChange={e => setSection(e.value)}
          min={2} max={10}>
          Sessões
        </NumberPicker>
      </NumberPickerContainer>

      <Button onClick={() => handleContinue()}>Continuar</Button>
    </Container>
  );
}

const Container = styled.div`
  background-color: var(--background);

  border-radius: 5px;

  width: 100%;
  max-width: 675px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${UI.device.tablet} {
    max-width: 600px;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 75px;
  text-align: center;

  @media ${UI.device.tablet} {
    margin-bottom: 10px;
  }
`;

const Button = styled(BaseButton)`
  width: 100%;
  max-width: 200px;
  margin: 50px auto 0 auto;

  @media ${UI.device.tablet} {
    margin-top: 10px;
  }
`;

const NumberPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media ${UI.device.mobileL} {
    flex-direction: column;
  }
`;