// src/components/common/TextInput.tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export const TextInput: React.FC<Props> = ({ label, error, style, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <RNTextInput
      placeholderTextColor={colors.textMuted}
      style={[styles.input, style]}
      {...rest}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    color: colors.textMuted,
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  error: {
    color: colors.danger,
    marginTop: 4,
    fontSize: 12,
  },
});
