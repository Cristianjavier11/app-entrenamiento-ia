import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function RoutinesScreen() {
  const theme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Mis Rutinas</Text>
      
      <View style={[styles.card, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Upper Body Power</Text>
          <Ionicons name="barbell-outline" size={24} color={Colors[theme].primary} />
        </View>
        <Text style={[styles.cardDesc, { color: Colors[theme].textSecondary }]}>Principiante • 40 min</Text>
      </View>

      <View style={[styles.card, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Leg Day Extremo</Text>
          <Ionicons name="fitness-outline" size={24} color={Colors[theme].primary} />
        </View>
        <Text style={[styles.cardDesc, { color: Colors[theme].textSecondary }]}>Avanzado • 60 min</Text>
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
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
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
});
