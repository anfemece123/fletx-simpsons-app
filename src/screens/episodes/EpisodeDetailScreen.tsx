import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { EpisodesStackParamList } from '../../navigation/types';
import { useEpisodeDetail } from '../../hooks/episodes/useEpisodeDetail';
import { NavBackButton } from '../../components/common/NavBackButton';

type Props = NativeStackScreenProps<EpisodesStackParamList, 'EpisodeDetail'>;

export const EpisodeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { episodeId, episodeName } = route.params;

  const { episode, loading, error, imageUri } = useEpisodeDetail(episodeId);

  useEffect(() => {
    if (episode) {
      navigation.setOptions({ title: episode.name ?? episodeName });
    }
  }, [episode, episodeName, navigation]);

  if (loading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </Screen>
    );
  }

  if (error || !episode) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.errorText}>
          {error ?? 'Episode not found.'}
        </Text>
        <Text style={styles.helperText}>
          Try going back and selecting the episode again.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <NavBackButton label="Back to episodes" style={styles.backButton} />

        {/* HEADER CARD */}
        <View style={styles.headerCard}>
          {imageUri && (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}

          <Text style={styles.title}>{episode.name}</Text>

          <Text style={styles.metaMain}>
            Season {episode.season} · Episode {episode.episode_number}
          </Text>

          {episode.airdate && (
            <Text style={styles.meta}>Air date: {episode.airdate}</Text>
          )}
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{episode.synopsis}</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 12,
  },
  headerCard: {
    paddingVertical: 14,
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
    marginBottom: 18,
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.inputBg,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  metaMain: {
    color: colors.textMuted,
    fontSize: 13,
  },
  meta: {
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 13,
  },
  sectionCard: {
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
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 18,
    color: colors.text,
    fontWeight: '700',
  },
  synopsis: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
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
