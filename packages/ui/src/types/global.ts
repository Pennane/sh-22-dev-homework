export interface ShortCharacter {
  id: number;
  name: string;
}

export interface LongCharacter extends ShortCharacter {
  description: string;
  age: number;
  happiness: number;
  hunger: number;
}
