import { useEffect, useMemo, useState } from 'react';
import { SimpsonsCharacter } from '../../types/characters';
import {
  charactersService,
  getPortraitUrl,
} from '../../services/charactersService';

export const useCharacterDetail = (characterId: number) => {
  const [character, setCharacter] = useState<SimpsonsCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await charactersService.getById(characterId);

        if (isMounted) {
          setCharacter(data);
        }
      } catch (e) {
        if (isMounted) {
          setError('Failed to load character details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [characterId]);

  const portraitUri = useMemo(
    () => getPortraitUrl(character?.portrait_path ?? null),
    [character?.portrait_path],
  );

  const formattedBirthdate = useMemo(() => {
    if (!character?.birthdate) return null;
    try {
      const d = new Date(character.birthdate);
      if (Number.isNaN(d.getTime())) return character.birthdate;
      return d.toLocaleDateString();
    } catch {
      return character.birthdate;
    }
  }, [character?.birthdate]);

  return {
    character,
    loading,
    error,
    portraitUri,
    formattedBirthdate,
  };
};
