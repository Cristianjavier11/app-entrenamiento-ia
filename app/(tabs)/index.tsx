import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { ROUTINES } from './routines';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: Colors[theme].text }]}>¡Hola, Atleta!</Text>
        <Text style={[styles.subtitle, { color: Colors[theme].textSecondary }]}>¿Qué entrenaremos hoy?</Text>
      </View>

      <TouchableOpacity 
        style={[styles.quickStartCard, { backgroundColor: Colors[theme].primary, marginBottom: Spacing.sm }]}
        onPress={() => router.push('/workout/active')}
      >
        <View style={styles.quickStartContent}>
          <Text style={styles.quickStartTitle}>Entrenamiento Rápido</Text>
          <Text style={styles.quickStartDesc}>Inicia un entreno en blanco</Text>
        </View>
        <Ionicons name="play-circle" size={40} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.quickStartCard, { backgroundColor: Colors[theme].primary }]}
        onPress={() => router.push('/timer')}
      >
        <View style={styles.quickStartContent}>
          <Text style={styles.quickStartTitle}>Temporizador de Descanso</Text>
          <Text style={styles.quickStartDesc}>Controla tus tiempos de pausa</Text>
        </View>
        <Ionicons name="timer-outline" size={40} color="#fff" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Rutinas Recomendadas</Text>
        
        {ROUTINES.slice(0, 2).map((routine) => (
          <TouchableOpacity 
            key={routine.id}
            style={[styles.card, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}
            onPress={() => router.push({ pathname: '/routines', params: { expandId: routine.id } })}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>{routine.name}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors[theme].textSecondary} />
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
        ))}
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
  header: {
    marginBottom: Spacing.xl,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: Spacing.xs,
  },
  quickStartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.xl,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quickStartDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
  },
});
