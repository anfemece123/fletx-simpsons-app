import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { CharacterCard } from '../../components/characters/CharacterCard';
import { CharactersStackParamList } from '../../navigation/types';
import { useCharactersList } from '../../hooks/characters/useCharactersList';
import { Pagination } from '../../components/common/Pagination';
import { useAppSelector } from '../../store/hooks';

type Nav = NativeStackNavigationProp<
  CharactersStackParamList,
  'CharactersList'
>;
export const CharactersListScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();

  const {
    items,
    page,
    totalPages,
    loading,
    search,
    handleSearchChange,
    handlePrevPage,
    handleNextPage,
    searchMode,
  } = useCharactersList();
  const { user, sessionToken } = useAppSelector(state => state.auth);

    console.log(user, sessionToken);
  

  const renderFooter = () =>
    loading ? (
      <View style={styles.footer}>
        <ActivityIndicator color={colors.primary} />
      </View>
    ) : null;

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Characters</Text>
      </View>

      <TextInput
        placeholder="Search character..."
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        value={search}
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() =>
              navigation.navigate('CharacterDetail', {
                characterId: item.id,
                characterName: item.name,
              })
            }
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No characters found.
            </Text>
          ) : null
        }
      />

      {!searchMode && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 16 },
  header: {
    marginBottom: 8,
  },
  title: {
    color: colors.primaryDark,
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
  },
  search: {
    backgroundColor: colors.inputBg,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: colors.text,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 8,
  },
  footer: {
    paddingVertical: 20,
  },
});
