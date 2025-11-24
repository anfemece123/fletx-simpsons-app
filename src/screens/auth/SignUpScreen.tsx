
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { AuthStackParamList } from '../../navigation/types';
import { useSignUp } from '../../hooks/auth/useSignUp';
import BartPeek from '../../assets/bart-peek.png';
import SimpsonsLogo from '../../assets/simpsons_logo.png';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const { values, errors, loading, handleChange, handleSubmit } = useSignUp();

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Image source={SimpsonsLogo} style={styles.logo} resizeMode="contain" />
      </View>


      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Create account</Text>

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

        <Button label="Sign up" onPress={handleSubmit} loading={loading} />

        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text style={styles.linkTextBold}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bartContainer} pointerEvents="none">
        <Image source={BartPeek} style={styles.bart} resizeMode="contain" />
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
    marginBottom: 4,
  },
  formSubtitle: {
    color: colors.textMuted,
    marginBottom: 16,
    fontSize: 13,
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

  bartContainer: {
    right: -171,
    marginBottom: -10,
  },
  bart: {
    width: 350,
    height: 160,
  },
});
