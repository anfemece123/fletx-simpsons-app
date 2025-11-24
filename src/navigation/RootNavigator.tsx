import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { bootstrapAuth } from '../store/slices/authSlice';
import { colors } from '../theme/colors';
import { AuthNavigator } from './AuthNavigator';
import { AppTabsNavigator } from './AppTabsNavigator';

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, initializing } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  if (initializing) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return <AppTabsNavigator />;
};
