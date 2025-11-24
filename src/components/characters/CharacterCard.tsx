// src/components/characters/CharacterCard.tsx
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getPortraitUrl } from '../../services/charactersService';
import { colors } from '../../theme/colors';
import { SimpsonsCharacter } from '../../types/characters';

interface Props {
  character: SimpsonsCharacter;
  onPress: () => void;
}
export const CharacterCard: React.FC<Props> = ({ character, onPress }) => {
  const imgUri = getPortraitUrl(character.portrait_path);
  const age = (character as any).age as number | undefined;
  const rawStatus = (character as any).status as string | undefined;

  const isDead =
    rawStatus && /dead|deceased|died|ghost/i.test(rawStatus ?? '');
  const aliveLabel = rawStatus
    ? rawStatus
    : isDead
    ? 'Deceased'
    : 'Alive';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
      onPress={onPress}
    >
      {imgUri && (
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: imgUri }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>

        {character.occupation ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {character.occupation}
          </Text>
        ) : null}

        <View style={styles.infoRow}>
          {typeof age === 'number' && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>Age: {age}</Text>
            </View>
          )}

          {aliveLabel && (
            <View
              style={[
                styles.chip,
                isDead ? styles.chipDead : styles.chipAlive,
              ]}
            >
              <Text style={styles.chipText}>
                {isDead ? 'Deceased' : 'Alive'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  imgContainer: {
    height: 130,  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  img: {
    width: '90%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  name: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: colors.backgroundSoft ?? '#F3F4F6',
  },
  chipAlive: {
    backgroundColor: '#BBF7D0',
  },
  chipDead: {
    backgroundColor: '#FECACA',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#111827',
  },
});
