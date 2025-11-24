import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppTabParamList } from './types';
import { CharactersNavigator } from './CharactersNavigator';
import { EpisodesNavigator } from './EpisodesNavigator';
import { LocationsNavigator } from './LocationsNavigator';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppTabsNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersNavigator}
        options={{ title: 'Characters' }}
      />

      <Tab.Screen
        name="Episodes"
        component={EpisodesNavigator}
        options={{ title: 'Episodes' }}
      />
      <Tab.Screen
        name="Locations"
        component={LocationsNavigator}
        options={{ title: 'Locations' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
