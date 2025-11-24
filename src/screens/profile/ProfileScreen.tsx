import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { useProfile } from '../../hooks/profile/useProfile';

export const ProfileScreen: React.FC = () => {
  const { user, initials, handleLogout } = useProfile();

  return (
    <Screen style={styles.container}>

      <View style={styles.avatarCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email}</Text>

      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign out</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  avatarCard: {
    alignItems: 'center',
    marginBottom: 28,
    paddingVertical: 10,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 4,
  },
  avatarText: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: '900',
  },

  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  email: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },

  // Info card
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,

    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },

  label: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },

  logoutBtn: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 14,

    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 3,
  },
  logoutText: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
});
