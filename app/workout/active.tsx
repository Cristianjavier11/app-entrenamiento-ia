import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ActiveWorkoutScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={[styles.timeText, { color: Colors[theme].text }]}>00:15:32</Text>
          <TouchableOpacity 
            style={[styles.finishButton, { backgroundColor: Colors[theme].success }]}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.finishText}>Finalizar</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.exerciseCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <View style={styles.exerciseHeader}>
            <Text style={[styles.exerciseTitle, { color: Colors[theme].text }]}>Press de Banca</Text>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors[theme].textSecondary} />
          </View>

          <View style={styles.setRow}>
            <Text style={[styles.setLabel, { color: Colors[theme].textSecondary }]}>SET</Text>
            <Text style={[styles.setLabel, { color: Colors[theme].textSecondary }]}>KG</Text>
            <Text style={[styles.setLabel, { color: Colors[theme].textSecondary }]}>REPS</Text>
            <Ionicons name="checkmark-circle-outline" size={24} color="transparent" />
          </View>

          <View style={[styles.setRow, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
            <Text style={[styles.setValue, { color: Colors[theme].text }]}>1</Text>
            <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].background }]} placeholder="0" placeholderTextColor={Colors[theme].textSecondary} keyboardType="numeric" />
            <TextInput style={[styles.input, { color: Colors[theme].text, backgroundColor: Colors[theme].background }]} placeholder="0" placeholderTextColor={Colors[theme].textSecondary} keyboardType="numeric" />
            <TouchableOpacity onPress={() => router.push('/workout/rest')}>
              <Ionicons name="checkmark-circle" size={28} color={Colors[theme].success} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.addSetButton, { borderColor: Colors[theme].primary }]}>
            <Text style={[styles.addSetText, { color: Colors[theme].primary }]}>+ Agregar Serie</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.addExerciseButton, { backgroundColor: Colors[theme].primary }]}>
          <Text style={styles.addExerciseText}>+ Agregar Ejercicio</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  finishButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.round,
  },
  finishText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseCard: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
    marginBottom: Spacing.xs,
  },
  setLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  setValue: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
  input: {
    width: 60,
    height: 36,
    borderRadius: Radius.sm,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  addSetButton: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: Radius.sm,
    alignItems: 'center',
  },
  addSetText: {
    fontWeight: 'bold',
  },
  addExerciseButton: {
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  addExerciseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
