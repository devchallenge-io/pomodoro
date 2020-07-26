import React from 'react';
import styled from 'styled-components';

import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown
} from 'react-icons/fa';

export default class NumberPicker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: props.value ?? 0,
      min: props.min ?? 0,
      max: props.max ?? 0
    };
  }

  handleChange(event){
    const value = parseInt(
      event.target.value != "" ? 
        event.target.value : 0
    );

    if(value > this.state.max || value < this.state.min) return;

    this.setState({ value });
  }

  handleArrowUp(event){
    if(this.state.value >= this.state.max)
      return;

    this.setState({
      value: this.state.value +1
    });
  }

  handleArrowDown(){
    if(this.state.value <= this.state.min)
      return;

    this.setState({
      value: this.state.value -1
    });
  }

  render(){
    return (
      <Container>
        <ArrowButtonContainer>
          <ArrowButton onClick={() => this.handleArrowUp(this)}>
            <FaArrowAltCircleUp
              size={32}
              color={'var(--foreground)'}
            />
          </ArrowButton>

          <ArrowButton onClick={() => this.handleArrowDown(this)}>
            <FaArrowAltCircleDown
              size={32}
              color={'var(--foreground)'}
            />
          </ArrowButton>
        </ArrowButtonContainer>
        <div>
          <Editor
            type="number"
            min={this.state.min}
            max={this.state.max}
            required="required" pattern="[0-9\s]{1,32}"
            value={this.state.value}
            onChange={e => this.handleChange(e)}
          />
          <Label>
            {this.props.children}
          </Label>
        </div>
      </Container>
    );
  }
};

const Container = styled.div`
  margin: 0 5px;
  display: flex;
  flex-direction: row;
`;

const Editor = styled.input`
  max-width: 140px;
  width: 100%;

  font-size: 75px;
  font-weight: 600;
  text-align: center;
  
  padding: 8px 0;
  border-radius: 7.5px;
  border: none;
  box-shadow: 1px 3px 5px #24283a;

  background-color: var(--background2);
  color: var(--foreground);

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance:textfield;
`;

const Label = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const ArrowButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 30px;
`;

const ArrowButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  filter: brightness(75%);

  :hover {
    filter: brightness(100%);
  }

  :first-child {
    margin-bottom: 7px;
  }
`;