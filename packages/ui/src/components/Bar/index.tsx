import React, { FC } from 'react';
import styled from 'styled-components';

const StyledTapOn = styled.div`
  height: 0.5em;
  width: 0.5em;
  border-radius: 100%;
  background: black;
  border: 1px solid black;
`;

const StyledTapOff = styled.div`
  height: 0.5em;
  width: 0.5em;
  border-radius: 100%;
  background: white;
  border: 1px solid black;
`;

const StyledTapBg = styled.div`
  width: 0.7em;
  height: 0.8em;

  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ITapProps {
  on: boolean;
}

const Tap: FC<ITapProps> = ({ on }) => {
  if (on) {
    return (
      <StyledTapBg>
        <StyledTapOn />
      </StyledTapBg>
    );
  }
  return (
    <StyledTapBg>
      <StyledTapOff />
    </StyledTapBg>
  );
};

const StyledBar = styled.div`
  display: flex;
`;

export interface IBarProps {
  value: number;
  min: number;
  max: number;
}

export const Bar: FC<IBarProps> = ({ min, max, value }) => {
  const width = max - min + 1;

  return (
    <StyledBar>
      {[...Array(width)].map((_, i) => (
        <Tap key={i} on={value > i} />
      ))}
    </StyledBar>
  );
};
