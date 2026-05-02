import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const EXERCISES = [
  { id: '1', name: 'Press de Banca', muscle: 'Pecho' },
  { id: '2', name: 'Sentadilla Libre', muscle: 'Piernas' },
  { id: '3', name: 'Dominadas', muscle: 'Espalda' },
  { id: '4', name: 'Press Militar', muscle: 'Hombros' },
  { id: '5', name: 'Curl de Bíceps', muscle: 'Brazos' },
];

export default function ExercisesScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Biblioteca de Ejercicios</Text>
      
      <FlatList
        data={EXERCISES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.listItem, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
            <Text style={[styles.itemName, { color: Colors[theme].text }]}>{item.name}</Text>
            <Text style={[styles.itemMuscle, { color: Colors[theme].textSecondary }]}>{item.muscle}</Text>
          </View>
        )}
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
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemMuscle: {
    fontSize: 14,
    marginTop: 4,
  },
});
