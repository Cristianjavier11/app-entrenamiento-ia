import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Progreso</Text>
      
      <View style={styles.grid}>
        <View style={[styles.statCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <Ionicons name="flame" size={32} color={Colors[theme].primary} />
          <Text style={[styles.statValue, { color: Colors[theme].text }]}>12</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>Racha de días</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <Ionicons name="barbell" size={32} color="#3b82f6" />
          <Text style={[styles.statValue, { color: Colors[theme].text }]}>15K</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>Kg levantados</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Récords Personales</Text>
      <View style={[styles.recordList, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        <View style={styles.recordItem}>
          <Text style={[styles.recordName, { color: Colors[theme].text }]}>Sentadilla</Text>
          <Text style={[styles.recordValue, { color: Colors[theme].primary }]}>120 kg</Text>
        </View>
        <View style={[styles.recordItem, { borderTopWidth: 1, borderTopColor: Colors[theme].border }]}>
          <Text style={[styles.recordName, { color: Colors[theme].text }]}>Press de Banca</Text>
          <Text style={[styles.recordValue, { color: Colors[theme].primary }]}>90 kg</Text>
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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  statCard: {
    width: '48%',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  recordList: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  recordName: {
    fontSize: 16,
  },
  recordValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
