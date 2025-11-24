import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { useEpisodesList } from '../../hooks/episodes/useEpisodesList';
import { getEpisodeImage } from '../../services/episodesService';
import { Episode } from '../../types/episodes';
import { Pagination } from '../../components/common/Pagination';
import { MediaCard } from '../../components/common/MediaCard';

export const EpisodesListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { episodes, page, pages, loading, setPage } = useEpisodesList();

  const renderEpisode = ({ item }: { item: Episode }) => {
    const img = getEpisodeImage(item.image_path);

    return (
      <MediaCard
        imageUri={img}
        title={item.name}
        overline={`Season ${item.season} · Episode ${item.episode_number}`}
        subtitle={item.airdate ? `Air date: ${item.airdate}` : undefined}
        description={item.synopsis ?? undefined}
        onPress={() =>
          navigation.navigate('EpisodeDetail', {
            episodeId: item.id,
            episodeName: item.name,
          })
        }
      />
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Episodes</Text>
      </View>

      <FlatList
        data={episodes}
        keyExtractor={ep => ep.id.toString()}
        renderItem={renderEpisode}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              color={colors.primary}
              style={styles.loader}
            />
          ) : null
        }
        contentContainerStyle={styles.listContent}
      />

      <Pagination
        page={page}
        totalPages={pages}
        onPrev={() => page > 1 && setPage(page - 1)}
        onNext={() => page < pages && setPage(page + 1)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  header: {
    marginBottom: 12,
  },
  screenTitle: {
    color: colors.primaryDark,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  loader: {
    marginVertical: 14,
  },
  listContent: {
    paddingBottom: 8,
  },
});
