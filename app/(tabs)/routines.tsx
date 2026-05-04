import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

import { useLocalSearchParams } from 'expo-router';

export const ROUTINES = [
  {
    id: '1',
    name: 'Principiante',
    icon: 'star-outline',
    duration: '30 min',
    exercises: [
      { name: 'Sentadilla', sets: 3, reps: '12' },
      { name: 'Flexiones', sets: 3, reps: '10' },
      { name: 'Abdominales', sets: 3, reps: '15' },
    ]
  },
  {
    id: '2',
    name: 'Fuerza',
    icon: 'barbell-outline',
    duration: '45 min',
    exercises: [
      { name: 'Press banca', sets: 4, reps: '5' },
      { name: 'Peso muerto', sets: 4, reps: '5' },
      { name: 'Sentadilla', sets: 4, reps: '5' },
    ]
  },
  {
    id: '3',
    name: 'Cardio',
    icon: 'heart-outline',
    duration: '25 min',
    exercises: [
      { name: 'Burpees', sets: 3, reps: '15' },
      { name: 'Saltos', sets: 3, reps: '20' },
      { name: 'Bicicleta', sets: 3, reps: '1 min' },
    ]
  },
  {
    id: '4',
    name: 'Pierna',
    icon: 'walk-outline',
    duration: '50 min',
    exercises: [
      { name: 'Sentadilla', sets: 4, reps: '10' },
      { name: 'Desplantes', sets: 3, reps: '12/pierna' },
      { name: 'Prensa', sets: 4, reps: '12' },
    ]
  },
  {
    id: '5',
    name: 'Pecho y Brazo',
    icon: 'body-outline',
    duration: '40 min',
    exercises: [
      { name: 'Press banca', sets: 4, reps: '10' },
      { name: 'Curl bíceps', sets: 3, reps: '12' },
      { name: 'Fondos', sets: 3, reps: 'al fallo' },
    ]
  }
];

export default function RoutinesScreen() {
  const theme = useColorScheme() ?? 'light';
  const params = useLocalSearchParams<{ expandId?: string }>();
  const [expandedId, setExpandedId] = useState<string | null>(params.expandId || null);

  React.useEffect(() => {
    if (params.expandId) {
      setExpandedId(params.expandId);
    }
  }, [params.expandId]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]} contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Mis Rutinas</Text>
      
      {ROUTINES.map((routine) => {
        const isExpanded = expandedId === routine.id;
        
        return (
          <View key={routine.id} style={[styles.card, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
            <TouchableOpacity 
              style={styles.cardTouchable} 
              onPress={() => toggleExpand(routine.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>{routine.name}</Text>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={Colors[theme].textSecondary} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={[styles.cardDesc, { color: '#3b82f6', fontWeight: 'bold' }]}>
                  {routine.exercises.length} ejercicios
                </Text>
                <Text style={[styles.cardDesc, { color: Colors[theme].textSecondary }]}> • </Text>
                <Text style={[styles.cardDesc, { color: '#10b981', fontWeight: 'bold' }]}>
                  {routine.duration}
                </Text>
              </View>
            </TouchableOpacity>

            {isExpanded && (
              <View style={[styles.exercisesContainer, { borderTopColor: Colors[theme].border }]}>
                {routine.exercises.map((ex, idx) => (
                  <View key={idx} style={styles.exerciseRow}>
                    <Text style={[styles.exerciseName, { color: Colors[theme].text }]}>• {ex.name}</Text>
                    <Text style={[styles.exerciseDetails, { color: Colors[theme].textSecondary }]}>
                      {ex.sets}x{ex.reps}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl + 20,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl + 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.xl,
  },
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  cardTouchable: {
    padding: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: 14,
  },
  exercisesContainer: {
    borderTopWidth: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  exerciseName: {
    fontSize: 16,
    flex: 1,
  },
  exerciseDetails: {
    fontSize: 16,
    fontWeight: '500',
  },
});
