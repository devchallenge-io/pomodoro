import React from 'react';
import styled from 'styled-components';

import {
  Button as BaseButton,
  Container as BaseContainer,
  NumberPicker
} from '../../components/ui';

export default function Config(){
  return (
    <Container>
      <Title>Pomodoro</Title>

      <NumberPickerContainer>
        <NumberPicker value={25} min={10} max={60}>
          Trabalho
        </NumberPicker>

        <NumberPicker value={5} min={1} max={25}>
          Pausa
        </NumberPicker>

        <NumberPicker value={4} min={1} max={99}>
          Sessões
        </NumberPicker>
      </NumberPickerContainer>

      <Button type="submit">Continuar</Button>
    </Container>
  );
}

const Container = styled(BaseContainer)`
  width: 100%;
  max-width: 650px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 75px;
`;

const Button = styled(BaseButton)`
  width: 100%;
  max-width: 200px;
  margin: 50px auto 0 auto;
`;

const NumberPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;