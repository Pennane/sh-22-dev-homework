import React, { FC } from 'react';
import styled from 'styled-components';
import { BabyPorcu, Porcu } from '../../assets';

const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 5em;
  height: 5em;
  margin-bottom: 1em;
`;

export interface ICharacterProps {
  age: number;
  id: number;
}

const innerStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  ObjectFit: 'contain',
};

export const CharacterImage: FC<ICharacterProps> = ({
  id,
  age,
  ...restProps
}) => {
  const hue = (id % 18) * 50;

  return (
    <StyledImage {...restProps}>
      {age === 1 && (
        <BabyPorcu
          style={{
            ...innerStyle,
            transform: 'scale(0.3)',
            filter: `hue-rotate(${hue}deg)`,
          }}
        />
      )}
      {age === 2 && (
        <BabyPorcu
          style={{
            ...innerStyle,
            transform: 'scale(0.6)',
            filter: `hue-rotate(${hue}deg)`,
          }}
        />
      )}
      {age === 3 && (
        <Porcu style={{ ...innerStyle, filter: `hue-rotate(${hue}deg)` }} />
      )}
    </StyledImage>
  );
};
