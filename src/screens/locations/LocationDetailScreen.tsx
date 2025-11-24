import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Screen } from '../../components/common/Screen';
import { colors } from '../../theme/colors';
import { LocationsStackParamList } from '../../navigation/types';
import { useLocationDetail } from '../../hooks/locations/useLocationDetail';
import { NavBackButton } from '../../components/common/NavBackButton';

type Props = NativeStackScreenProps<
  LocationsStackParamList,
  'LocationDetail'
>;

export const LocationDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { locationId, locationName } = route.params;

  const { location, loading, error, imageUri } =
    useLocationDetail(locationId);

  useEffect(() => {
    if (location) {
      navigation.setOptions({
        title: location.name ?? locationName,
      });
    }
  }, [location, locationName, navigation]);

  if (loading) {
    return (
      <Screen style={styles.center}>
        <ActivityIndicator color={colors.primary} size="large" />
      </Screen>
    );
  }

  if (error || !location) {
    return (
      <Screen style={styles.center}>
        <Text style={styles.errorText}>
          {error ?? 'Location not found.'}
        </Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <NavBackButton
          label="Back to locations"
          style={styles.backButton}
        />

        {/* Header Card */}
        <View style={styles.headerCard}>
          {imageUri ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ) : (
            <View style={[styles.imageWrapper, styles.placeholder]}>
              <Text style={styles.placeholderText}>No image</Text>
            </View>
          )}

          <Text style={styles.name}>{location.name}</Text>

          {location.town && (
            <Text style={styles.meta}>Town: {location.town}</Text>
          )}

          {location.use && (
            <Text style={styles.meta}>Use: {location.use}</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingTop: 12,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 12,
  },
  headerCard: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 18,
  },

  imageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.inputBg,
    marginBottom: 12,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  name: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },

  meta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },

  errorText: {
    color: colors.danger,
    fontSize: 14,
  },
});
