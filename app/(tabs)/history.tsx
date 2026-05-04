import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useWorkouts, RegistroEntrenamiento } from '@/context/WorkoutContext';

export default function HistoryScreen() {
  const theme = useColorScheme() ?? 'light';
  const { workouts } = useWorkouts();

  const renderItem = ({ item }: { item: RegistroEntrenamiento }) => {
    const dateString = item.fecha.toISOString().split('T')[0];
    return (
      <View style={[styles.historyCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{dateString}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>{item.ejercicio}</Text>
          <View style={styles.statsContainer}>
            <View style={[styles.statBadge, { backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)' }]}>
              <Text style={[styles.statBadgeText, { color: '#3b82f6' }]}>{item.series} series</Text>
            </View>
            <View style={[styles.statBadge, { backgroundColor: theme === 'dark' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)' }]}>
              <Text style={[styles.statBadgeText, { color: '#10b981' }]}>{item.repeticiones} reps</Text>
            </View>
            <View style={[styles.statBadge, { backgroundColor: theme === 'dark' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.1)' }]}>
              <Text style={[styles.statBadgeText, { color: '#eab308' }]}>{item.peso} kg</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Historial</Text>
      
      {workouts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="barbell-outline" size={48} color={Colors[theme].textSecondary} />
          <Text style={[styles.emptyText, { color: Colors[theme].textSecondary }]}>No hay entrenamientos registrados aún.</Text>
        </View>
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.timeline}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  timeline: {
    marginTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  historyCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateBadge: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginRight: Spacing.lg,
  },
  dateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    flexWrap: 'wrap',
    gap: 6,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  statBadgeText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    marginTop: Spacing.md,
    fontSize: 16,
    textAlign: 'center',
  },
});
