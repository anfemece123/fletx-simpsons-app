import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

interface NavBackButtonProps {
  label?: string;
  style?: ViewStyle;
}

export const NavBackButton: React.FC<NavBackButtonProps> = ({
  label = 'Back',
  style,
}) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{'◀'}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  icon: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDark,
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
});
