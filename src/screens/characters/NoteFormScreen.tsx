import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { CharactersStackParamList } from '../../navigation/types';
import { useNoteForm } from '../../hooks/characters/useNoteForm';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { NavBackButton } from '../../components/common/NavBackButton';

type Props = NativeStackScreenProps<CharactersStackParamList, 'NoteForm'>;

export const NoteFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { characterId, noteId } = route.params;

  const {
    values,
    loading,
    isEditMode,
    handleChange,
    handleSubmit,
  } = useNoteForm(characterId, noteId);

  const onSubmit = async () => {
    const ok = await handleSubmit();
    if (ok) {
      navigation.goBack();
    }
  };

  return (
    <Screen style={styles.container}>
      <NavBackButton label="Back to notes" style={styles.backButton} />

      <View style={styles.formCard}>
        <Text style={styles.title}>
          {isEditMode ? 'Edit note' : 'Create note'}
        </Text>
        <TextInput
          label="Title"
          value={values.title}
          onChangeText={text => handleChange('title', text)}
          placeholder="e.g. Favorite scene"
          placeholderTextColor={colors.textMuted}
        />

        <TextInput
          label="Text"
          value={values.text}
          onChangeText={text => handleChange('text', text)}
          placeholder="e.g. This scene was amazing..."
          placeholderTextColor={colors.textMuted}
          multiline
          style={styles.textArea}
        />

        <TextInput
          label="Rating (1 - 5)"
          value={values.rating}
          onChangeText={text => handleChange('rating', text)}
          keyboardType="numeric"
        />

        <Button
          label={isEditMode ? 'Save changes' : 'Create note'}
          onPress={onSubmit}
          loading={loading}
        />
      </View>
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
  formCard: {
    marginTop: 4,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});
