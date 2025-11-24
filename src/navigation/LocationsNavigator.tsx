import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LocationsStackParamList } from './types';
import { LocationsListScreen } from '../screens/locations/LocationsListScreen';
import { LocationDetailScreen } from '../screens/locations/LocationDetailScreen';
import { colors } from '../theme/colors';

const LocationsStack = createNativeStackNavigator<LocationsStackParamList>();

export const LocationsNavigator: React.FC = () => {
  return (
    <LocationsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LocationsStack.Screen
        name="LocationsList"
        component={LocationsListScreen}
        options={{ title: 'Locations' }}
      />
      <LocationsStack.Screen
        name="LocationDetail"
        component={LocationDetailScreen}
        options={({ route }) => ({
          title: route.params.locationName,
        })}
      />
    </LocationsStack.Navigator>
  );
};
