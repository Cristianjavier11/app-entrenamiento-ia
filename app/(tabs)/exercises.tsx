import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

const EXERCISES = [
  { id: '1', name: 'Press de Banca', muscle: 'Pecho', description: 'Acuéstate en un banco plano. Baja la barra hasta el pecho y empuja hacia arriba con fuerza.' },
  { id: '2', name: 'Sentadilla Libre', muscle: 'Piernas', description: 'Con la barra en la espalda, flexiona rodillas y caderas hasta romper el paralelo, manteniendo el pecho erguido y espalda recta.' },
  { id: '3', name: 'Dominadas', muscle: 'Espalda', description: 'Cuélgate de una barra. Tira de tu cuerpo hacia arriba hasta que la barbilla pase la barra y baja controladamente.' },
  { id: '4', name: 'Press Militar', muscle: 'Hombros', description: 'De pie o sentado, empuja una barra o mancuernas desde la altura de los hombros hasta estirar los brazos completamente por encima de la cabeza.' },
  { id: '5', name: 'Curl de Bíceps', muscle: 'Brazos', description: 'Sostén una mancuerna en cada mano y flexiona los codos subiendo el peso hacia los hombros sin balancear el torso.' },
];

export default function ExercisesScreen() {
  const theme = useColorScheme() ?? 'light';
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Biblioteca de Ejercicios</Text>
      
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;
          return (
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => toggleExpand(item.id)}
              style={[styles.listItem, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}
            >
              <View style={styles.headerRow}>
                <View>
                  <Text style={[styles.itemName, { color: Colors[theme].text }]}>{item.name}</Text>
                  <Text style={[styles.itemMuscle, { color: Colors[theme].primary, fontWeight: '600' }]}>{item.muscle}</Text>
                </View>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={Colors[theme].textSecondary} />
              </View>
              {isExpanded && (
                <View style={[styles.descriptionContainer, { borderTopColor: Colors[theme].border }]}>
                  <Text style={[styles.descriptionText, { color: Colors[theme].textSecondary }]}>{item.description}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl + 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.xl,
  },
  listItem: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemMuscle: {
    fontSize: 14,
    marginTop: 4,
  },
  descriptionContainer: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
