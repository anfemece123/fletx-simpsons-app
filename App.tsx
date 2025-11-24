// App.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    primary: colors.primary,
    border: colors.border,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
