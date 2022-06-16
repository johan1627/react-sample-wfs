export interface WandTypes {
  wood: string;
  core: string;
  length: number;
}

export interface CharacterTypes {
  name: string;
  alternate_names: Array<string>;
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: WandTypes;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: Array<string>;
  alive: true;
  image: string;
}
