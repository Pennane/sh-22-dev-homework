import React, { useState } from 'react';
import { gql, useQuery } from 'urql';
import styled from 'styled-components';

import { Frame } from '../../assets';
import { Character } from '../../components/Character';
import { Screen } from '../../components/Screen';
import { ShortCharacter } from '../../types/global';
import { Buttons } from '../../components/Buttons';
import { useInterval } from '../../hooks/useInterval';

const query = gql`
  query GetCharacters {
    characters {
      name
      id
    }
  }
`;

const StyledNavigationButton = styled.button`
  width: 3rem;
  height: 3rem;

  border: 3px solid;
  border-radius: 100%;
  border-color: hsl(190deg 65% 69%);
  background: hsl(190deg 65% 39%);
  color: white;

  cursor: pointer;
  font-size: 1.5em;

  display: flex;
  justify-content: center;
  align-items: center;
`;

interface INavigationButtonProps {
  onClick: () => void;
}

const NavigationButton: React.FC<INavigationButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <StyledNavigationButton onClick={onClick}>
      {children}
    </StyledNavigationButton>
  );
};

const StyledHome = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e5fbff;
`;

export const Home: React.FC = () => {
  const [result, refetchResult] = useQuery<{ characters: ShortCharacter[] }>({
    query,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useInterval(
    () => refetchResult({ requestPolicy: 'network-only' }),
    1000 * 60,
  );

  function selectNext() {
    if (!result.data?.characters) return;
    setSelectedIndex(() => {
      if (!result.data?.characters) return 0;
      return selectedIndex + 1 >= result.data.characters.length
        ? 0
        : selectedIndex + 1;
    });
  }
  function selectPrevious() {
    if (!result.data?.characters) return;
    setSelectedIndex(() => {
      if (!result.data?.characters) return 0;
      return selectedIndex - 1 < 0
        ? result.data.characters.length - 1
        : selectedIndex - 1;
    });
  }

  if (result.fetching && !result.data) {
    return null;
  }

  if (!result.data) {
    return null;
  }

  const character: ShortCharacter = result.data.characters[selectedIndex];

  return (
    <StyledHome>
      <Screen>
        <NavigationButton onClick={selectPrevious}>{'←'} </NavigationButton>
        <Character
          name={character.name}
          id={character.id}
          currentIndex={selectedIndex}
          amount={result.data.characters.length}
        />
        <NavigationButton onClick={selectNext}>{'→'} </NavigationButton>
      </Screen>
      <Frame />
      <Buttons id={character.id} />
    </StyledHome>
  );
};
