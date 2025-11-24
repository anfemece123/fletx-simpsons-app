import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { AuthStackParamList } from '../../navigation/types';
import { useSignIn } from '../../hooks/auth/useSignIn';
import HomerPeek from '../../assets/homer-peek.png';
import SimpsonsLogo from '../../assets/simpsons_logo.png';


type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

export const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const { values, errors, loading, handleChange, handleSubmit } = useSignIn();


  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
    <Image
      source={SimpsonsLogo}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Sign in</Text>

        <TextInput
          label="Email"
          value={values.email}
          onChangeText={text => handleChange('email', text)}
          autoCapitalize="none"
          keyboardType="email-address"
          error={errors.email}
        />

        <TextInput
          label="Password"
          value={values.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
          error={errors.password}
        />

        <Button label="Sign in" onPress={handleSubmit} loading={loading} />

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.linkText}>
            Don&apos;t have an account? <Text style={styles.linkTextBold}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homerContainer} pointerEvents="none">
        <Image source={HomerPeek} style={styles.homer} resizeMode="contain" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    justifyContent: 'space-between', 
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 120,
  },

  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primaryDark,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 4,
  },
  subtitle: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 14,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 6,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 16,
  },
  linkContainer: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  linkTextBold: {
    color: colors.accentBlue,
    fontWeight: '600',
  },
  homerContainer: {
    alignItems: 'center',
    marginBottom: -10, 
  },
  homer: {
    width: 400,
    height: 150,
  },
});
