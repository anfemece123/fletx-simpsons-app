// src/hooks/characters/useCharactersList.ts
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchCharacters,
  fetchAllCharacters,
  setPage,
  setSearch,
} from '../../store/slices/charactersSlice';

export const useCharactersList = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    allItems,
    page,
    totalPages,
    loading,
    search,
    searchMode,
  } = useAppSelector(state => state.characters);

  useEffect(() => {
    if (!searchMode) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, page, searchMode]);

  useEffect(() => {
    if (searchMode && allItems.length === 0) {
      dispatch(fetchAllCharacters());
    }
  }, [dispatch, searchMode, allItems.length]);

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearch(value));
    },
    [dispatch]
  );

  const handlePrevPage = useCallback(() => {
    if (page > 1) dispatch(setPage(page - 1));
  }, [dispatch, page]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) dispatch(setPage(page + 1));
  }, [dispatch, page, totalPages]);

  const filtered = searchMode
    ? allItems.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return {
    items: filtered,
    page,
    totalPages,
    search,
    searchMode,
    loading,
    handleSearchChange,
    handlePrevPage,
    handleNextPage,
  };
};
