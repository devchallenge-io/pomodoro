import React from 'react';
import styled from 'styled-components';

import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown
} from 'react-icons/fa';

import device from './utils/device';

export default class NumberPicker extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: parseInt(props.value) ?? 0,
      min: parseInt(props.min) ?? 0,
      max: parseInt(props.max) ?? 0
    };
  }

  handleChange(event){
    const value = parseInt(
      event.target.value !== "" ? 
        event.target.value : 0
    );

    if(value > this.state.max || value < this.state.min) return;

    this.setState({ value });

    if(typeof(this.props.onChange) === 'function')
      this.props.onChange({ value });
  }

  handleArrowUp(event){
    if(this.state.value >= this.state.max)
      return;

    this.setState({
      value: this.state.value +1
    });

    if(typeof(this.props.onChange) === 'function')
      this.props.onChange({ value: this.state.value +1 });
  }

  handleArrowDown(){
    if(this.state.value <= this.state.min)
      return;

    this.setState({
      value: this.state.value -1
    });

    if(typeof(this.props.onChange) === 'function')
      this.props.onChange({ value: this.state.value -1 });
  }

  render(){
    return (
      <Container>
        <ArrowButtonContainer>
          <ArrowButton onClick={() => this.handleArrowUp(this)}>
            <FaArrowAltCircleUp
              size={32}
              color={'#666c8b'}
            />
          </ArrowButton>

          <ArrowButton onClick={() => this.handleArrowDown(this)}>
            <FaArrowAltCircleDown
              size={32}
              color={'#666c8b'}
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
  margin: 5px;
  display: flex;
  flex-direction: row;

  transform: translateX(-21px);
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
  text-align: center;
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

  :hover {
    filter: brightness(120%);
  }

  :first-child {
    margin-bottom: 7px;
  }

  @media ${device.tablet} {
    :hover {
      filter: brightness(100%)
    }

    :active {
      filter: brightness(120%)
    }
  }
`;