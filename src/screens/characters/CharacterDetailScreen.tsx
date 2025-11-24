import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { CharactersStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { useCharacterDetail } from '../../hooks/characters/useCharacterDetail';
import { NavBackButton } from '../../components/common/NavBackButton';

type Props = NativeStackScreenProps<
  CharactersStackParamList,
  'CharacterDetail'
>;

export const CharacterDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { characterId, characterName } = route.params;

  const {
    character,
    loading,
    error,
    portraitUri,
    formattedBirthdate,
  } = useCharacterDetail(characterId);

  useEffect(() => {
    if (character) {
      navigation.setOptions({
        title: character.name ?? characterName,
      });
    }
  }, [character, characterName, navigation]);

  if (loading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  if (error || !character) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.errorText}>
          {error ?? 'Character not found.'}
        </Text>
        <Text style={styles.helperText}>
          Try going back and selecting the character again.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <NavBackButton label="Back to list" style={styles.backButton} />

        <View style={styles.headerCard}>
          {portraitUri && (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: portraitUri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}

          <Text style={styles.name}>{character.name}</Text>

          <View style={styles.metaRow}>
            {character.gender && (
              <Text style={styles.metaText}>{character.gender}</Text>
            )}
            {character.age != null && (
              <>
                <Text style={styles.dot}>·</Text>
                <Text style={styles.metaText}>{character.age} years</Text>
              </>
            )}
            {character.status && (
              <>
                <Text style={styles.dot}>·</Text>
                <Text
                  style={[
                    styles.metaText,
                    character.status === 'Deceased' && { color: colors.danger },
                  ]}
                >
                  {character.status}
                </Text>
              </>
            )}
          </View>

          {character.occupation ? (
            <Text style={styles.occupation} numberOfLines={2}>
              {character.occupation}
            </Text>
          ) : null}

          {/* Notes button */}
          <TouchableOpacity
            style={styles.notesButton}
            onPress={() =>
              navigation.navigate('CharacterNotes', {
                characterId: character.id,
                characterName: character.name,
              } )
            }
          >
            <Text style={styles.notesButtonText}>
              View notes for this character
            </Text>
          </TouchableOpacity>
        </View>

        {/* BASIC INFO */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>
              {character.age != null ? `${character.age} years` : 'Unknown'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Birthdate</Text>
            <Text style={styles.infoValue}>
              {formattedBirthdate ?? 'Not available'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text
              style={[
                styles.infoValue,
                character.status === 'Deceased' && { color: colors.danger },
              ]}
            >
              {character.status ?? 'Unknown'}
            </Text>
          </View>
        </View>

        {/* PHRASES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Phrases</Text>
          {character.phrases && character.phrases.length > 0 ? (
            character.phrases.map((phrase, idx) => (
              <View
                key={`${idx}-${phrase.slice(0, 10)}`}
                style={styles.phraseRow}
              >
                <Text style={styles.phraseBullet}>•</Text>
                <Text style={styles.phraseText}>{phrase}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>
              This character has no phrases in the API.
            </Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  headerCard: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  imageWrapper: {
    width: 170,
    height: 170,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.primary,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: colors.card,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  dot: {
    color: colors.textMuted,
    marginHorizontal: 4,
  },
  occupation: {
    color: colors.text,
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 16,
  },
  notesButton: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  notesButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionCard: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  infoValue: {
    color: colors.text,
    fontSize: 13,
    textAlign: 'right',
    maxWidth: '60%',
  },
  phraseRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  phraseBullet: {
    color: colors.primary,
    marginRight: 6,
    marginTop: 2,
  },
  phraseText: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
  },
  emptyText: {
    color: colors.textMuted,
    fontStyle: 'italic',
    fontSize: 13,
  },
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginBottom: 8,
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
