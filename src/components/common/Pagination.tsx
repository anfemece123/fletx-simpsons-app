// src/components/common/Pagination.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPrev,
  onNext,
}) => {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconButton, !canGoPrev && styles.iconButtonDisabled]}
        onPress={onPrev}
        disabled={!canGoPrev}
      >
        <Text style={[styles.iconText, !canGoPrev && styles.iconTextDisabled]}>
          ◀
        </Text>
      </TouchableOpacity>

      <View style={styles.pageBadge}>
        <Text style={styles.pageText}>
          {page} <Text style={styles.pageTotal}>/ {totalPages}</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.iconButton, !canGoNext && styles.iconButtonDisabled]}
        onPress={onNext}
        disabled={!canGoNext}
      >
        <Text style={[styles.iconText, !canGoNext && styles.iconTextDisabled]}>
          ▶
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  iconButtonDisabled: {
    backgroundColor: colors.backgroundSoft ?? '#F3F4F6',
    shadowOpacity: 0,
    elevation: 0,
  },
  iconText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  iconTextDisabled: {
    color: colors.textMuted,
  },
  pageBadge: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  pageText: {
    fontWeight: '800',
    fontSize: 14,
    color: '#111827',
  },
  pageTotal: {
    fontWeight: '600',
    opacity: 0.8,
  },
});
