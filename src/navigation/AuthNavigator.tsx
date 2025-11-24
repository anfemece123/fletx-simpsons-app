import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList } from './types';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { colors } from '../theme/colors';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Iniciar sesión' }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: 'Crear cuenta' }}
      />
    </AuthStack.Navigator>
  );
};
