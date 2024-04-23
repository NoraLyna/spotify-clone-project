import React from 'react'
import styled from 'styled-components';
import Track from './Track';
import ControlButtons from './ControlButtons';
import Volume from './Volume';

export default function Footer() {
  return (
    <Container>
      <Track></Track>
      <ControlButtons></ControlButtons>
      <Volume/>
    </Container>
  )
}


const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;