// src/components/common/MediaCard.tsx
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';

interface MediaCardProps {
  imageUri?: string | null;
  title: string;
  overline?: string;
  subtitle?: string;
  description?: string;     
  onPress: () => void;
  containerStyle?: ViewStyle;
  placeholderLabel?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  imageUri,
  title,
  overline,
  subtitle,
  description,
  onPress,
  containerStyle,
  placeholderLabel = 'No image',
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, containerStyle]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.imgWrapper}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.placeholderText}>{placeholderLabel}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {overline ? <Text style={styles.overline}>{overline}</Text> : null}

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}

        {description ? (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    gap: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  imgWrapper: {
    width: 110,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.inputBg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  overline: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 2,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  description: {
    color: colors.text,
    fontSize: 12,
    marginTop: 8,
  },
});
