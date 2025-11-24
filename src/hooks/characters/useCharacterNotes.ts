import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchNotes, deleteNote } from '../../store/slices/notesSlice';

export const useCharacterNotes = (characterId: number) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.auth);
  const notes = useAppSelector(state => state.notes.items);

  useEffect(() => {
    if (!user) return;

    dispatch(fetchNotes({ userId: user.id, characterId }));
  }, [dispatch, user, characterId]);

  const handleDelete = useCallback(
    (noteId: string) => {
      dispatch(deleteNote(noteId));
    },
    [dispatch],
  );

  return {
    notes,
    handleDelete,
  };
};
