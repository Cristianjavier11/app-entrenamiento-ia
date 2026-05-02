import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Historial</Text>
      
      <View style={styles.timeline}>
        <View style={[styles.historyCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>Hoy</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Día de Piernas</Text>
            <Text style={[styles.cardStats, { color: Colors[theme].textSecondary }]}>
              <Ionicons name="time-outline" size={14} /> 45 min  •  <Ionicons name="barbell-outline" size={14} /> 4500 kg
            </Text>
          </View>
        </View>

        <View style={[styles.historyCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>Ayer</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Empuje</Text>
            <Text style={[styles.cardStats, { color: Colors[theme].textSecondary }]}>
              <Ionicons name="time-outline" size={14} /> 55 min  •  <Ionicons name="barbell-outline" size={14} /> 6200 kg
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  historyCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  dateBadge: {
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.round,
    marginRight: Spacing.md,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardStats: {
    fontSize: 14,
  },
});
