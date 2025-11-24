// src/components/common/Button.tsx
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onPress, loading }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      pressed && { transform: [{ scale: 0.98 }] },
      loading && { opacity: 0.7 },
    ]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#111827" />
    ) : (
      <Text style={styles.label}>{label}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
  label: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.4,
  },
});
