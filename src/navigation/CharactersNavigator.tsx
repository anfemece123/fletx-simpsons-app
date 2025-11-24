import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CharactersStackParamList } from './types';
import { CharactersListScreen } from '../screens/characters/CharactersListScreen';
import { CharacterDetailScreen } from '../screens/characters/CharacterDetailScreen';
import { CharacterNotesScreen } from '../screens/characters/CharacterNotesScreen';
import { NoteFormScreen } from '../screens/characters/NoteFormScreen';
import { colors } from '../theme/colors';

const CharactersStack = createNativeStackNavigator<CharactersStackParamList>();

export const CharactersNavigator: React.FC = () => {
  return (
    <CharactersStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <CharactersStack.Screen
        name="CharactersList"
        component={CharactersListScreen}
        options={{ title: 'Personajes' }}
      />
      <CharactersStack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={({ route }) => ({
          title: route.params.characterName,
        })}
      />
      <CharactersStack.Screen
        name="CharacterNotes"
        component={CharacterNotesScreen}
        options={{ title: 'Notas' }}
      />
      <CharactersStack.Screen
        name="NoteForm"
        component={NoteFormScreen}
        options={{ title: 'Nota' }}
      />
    </CharactersStack.Navigator>
  );
};
