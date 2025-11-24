import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../types/notes';

const NOTES_KEY = 'fletx_notes';

async function getAllNotes(): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export const notesStorage = {
  async listByUserAndCharacter(userId: string, characterId: number): Promise<Note[]> {
    const notes = await getAllNotes();
    return notes.filter(n => n.userId === userId && n.characterId === characterId);
  },

  async create(payload: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) {
    const notes = await getAllNotes();

    const newNote: Note = {
      ...payload,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return newNote;
  },

  async update(noteId: string, data: Partial<Omit<Note, 'id'>>) {
    const notes = await getAllNotes();
    const index = notes.findIndex(n => n.id === noteId);

    if (index === -1) throw new Error('Nota no encontrada');

    notes[index] = {
      ...notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    return notes[index];
  },

  async remove(noteId: string) {
    const notes = await getAllNotes();
    const newNotes = notes.filter(n => n.id !== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    return true;
  },
};
