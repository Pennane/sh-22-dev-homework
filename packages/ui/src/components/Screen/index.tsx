import React, { FC } from 'react';
import styled from 'styled-components';

const StyledScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;

  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  align-items: center;

  width: 18.3em;
`;

export interface IScreenProps {}

export const Screen: FC<IScreenProps> = ({ ...restProps }) => {
  return <StyledScreen {...restProps}></StyledScreen>;
};
