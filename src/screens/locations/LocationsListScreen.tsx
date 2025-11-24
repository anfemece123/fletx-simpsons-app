import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { LocationsStackParamList } from '../../navigation/types';
import { getLocationImage } from '../../services/locationsService';
import { useLocationsList } from '../../hooks/locations/useLocationsList';
import { Location } from '../../types/locations';
import { MediaCard } from '../../components/common/MediaCard';
import { Pagination } from '../../components/common/Pagination';

type Nav = NativeStackNavigationProp<LocationsStackParamList, 'LocationsList'>;

export const LocationsListScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const {
    items,
    page,
    pages,
    loading,
    error,
    loadLocations,
  } = useLocationsList();

  const renderItem = ({ item }: { item: Location }) => {
    const imgUri = getLocationImage(item.image_path);

    return (
      <MediaCard
        imageUri={imgUri}
        title={item.name}
        overline={item.use ? `Use: ${item.use}` : undefined}
        subtitle={item.town ?? undefined}
        onPress={() =>
          navigation.navigate('LocationDetail', {
            locationId: item.id,
            locationName: item.name,
          })
        }
      />
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Locations</Text>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading && items.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pagination
        page={page}
        totalPages={pages}
        onPrev={() => page > 1 && loadLocations(page - 1)}
        onNext={() => page < pages && loadLocations(page + 1)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 12 },
  header: {
    marginBottom: 12,
  },
  title: {
    color: colors.primaryDark,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
  },
  error: {
    color: colors.danger,
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 8,
  },
});
