import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  createNote,
  updateNote,
  fetchNotes,
} from '../../store/slices/notesSlice';
import { notesStorage } from '../../storage/notesStorage';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  text: yup.string().required('Text is required'),
  rating: yup
    .number()
    .min(1, 'Minimum rating is 1')
    .max(5, 'Maximum rating is 5')
    .required('Rating is required'),
});

type FormState = {
  title: string;
  text: string;
  rating: string;
};

export const useNoteForm = (characterId: number, noteId?: string) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const [values, setValues] = useState<FormState>({
    title: '',
    text: '',
    rating: '5',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId || !user) return;

      const notes = await notesStorage.listByUserAndCharacter(
        user.id,
        characterId,
      );

      const found = notes.find(n => n.id === noteId);
      if (found) {
        setValues({
          title: found.title,
          text: found.text,
          rating: String(found.rating),
        });
      }
    };

    loadNote();
  }, [noteId, user, characterId]);

  const handleChange = (field: keyof FormState, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (): Promise<boolean> => {
    try {
      if (!user) {
        Alert.alert('Error', 'You must be logged in to save notes.');
        return false;
      }

      setLoading(true);

      const payload = {
        title: values.title,
        text: values.text,
        rating: Number(values.rating),
      };

      await schema.validate(
        {
          title: payload.title,
          text: payload.text,
          rating: payload.rating,
        },
        { abortEarly: false },
      );

      if (noteId) {
        // Update
        await dispatch(
          updateNote({
            id: noteId,
            data: payload,
          }),
        ).unwrap();
      } else {
        // Create
        await dispatch(
          createNote({
            userId: user.id,
            characterId,
            ...payload,
          }),
        ).unwrap();
      }
      await dispatch(
        fetchNotes({ userId: user.id, characterId }),
      ).unwrap();

      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const messages = err.inner
          .map(e => e.message)
          .join('\n');

        Alert.alert('Invalid form', messages);
        return false;
      }

      Alert.alert(
        'Error',
        (err as Error)?.message ?? 'An error occurred while saving the note.',
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    loading,
    isEditMode: !!noteId,
    handleChange,
    handleSubmit,
  };
};
