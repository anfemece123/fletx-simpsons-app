import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EpisodesStackParamList } from './types';
import { EpisodesListScreen } from '../screens/episodes/EpisodesListScreen';
import { EpisodeDetailScreen } from '../screens/episodes/EpisodeDetailScreen';
import { colors } from '../theme/colors';

const EpisodesStack = createNativeStackNavigator<EpisodesStackParamList>();

export const EpisodesNavigator: React.FC = () => {
  return (
    <EpisodesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <EpisodesStack.Screen
        name="EpisodesList"
        component={EpisodesListScreen}
        options={{ title: 'Episodios' }}
      />
      <EpisodesStack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
        options={({ route }) => ({
          title: route.params.episodeName,
        })}
      />
    </EpisodesStack.Navigator>
  );
};
