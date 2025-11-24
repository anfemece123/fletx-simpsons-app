export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type CharactersStackParamList = {
  CharactersList: undefined;
  CharacterDetail: {
    characterId: number;
    characterName: string;
  };
  CharacterNotes: {
    characterId: number;
    characterName: string;
  };
  NoteForm: {
    characterId: number;
    noteId?: string;
  };
};

export type EpisodesStackParamList = {
  EpisodesList: undefined;
  EpisodeDetail: {
    episodeId: number;
    episodeName: string;
  };
};

export type LocationsStackParamList = {
  LocationsList: undefined;
  LocationDetail: {
    locationId: number;
    locationName: string;
  };
};

export type AppTabParamList = {
  Characters: undefined;
  Episodes: undefined;  
  Profile: undefined;
  Locations: undefined;
};