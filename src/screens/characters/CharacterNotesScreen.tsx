import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { CharactersStackParamList } from '../../navigation/types';
import { useCharacterNotes } from '../../hooks/characters/useCharacterNotes';
import { NavBackButton } from '../../components/common/NavBackButton';

type Props = NativeStackScreenProps<
  CharactersStackParamList,
  'CharacterNotes'
>;

export const CharacterNotesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { characterId, characterName } = route.params;

  const { notes, handleDelete } = useCharacterNotes(characterId);

  return (
    <Screen style={styles.container}>
      <NavBackButton label="Back to character" style={styles.backButton} />

      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('NoteForm', {
            characterId,
          })
        }
      >
        <Text style={styles.addButtonText}>➕ Create new note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>You don't have any notes yet.</Text>
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            {/* TITLE */}
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText} numberOfLines={2}>
              {item.text}
            </Text>

            {/* RATING */}
            <Text style={styles.rating}>⭐ {item.rating} / 5</Text>

            {/* ACTIONS */}
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate('NoteForm', {
                    characterId,
                    noteId: item.id,
                  })
                }
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    color: colors.primaryDark,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 4,
  },
  addButtonText: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 16,
  },
  noteCard: {
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  noteTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  noteText: {
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 10,
    fontSize: 13,
  },
  rating: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 13,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.inputBg,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  editText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.danger,
    paddingVertical: 9,
    borderRadius: 999,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  },
  empty: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
});
