import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RestScreen() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Tiempo de Descanso</Text>
      
      <View style={[styles.timerCircle, { borderColor: Colors[theme].primary }]}>
        <Text style={[styles.timerText, { color: Colors[theme].text }]}>01:30</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: Colors[theme].surface }]}>
          <Text style={[styles.controlText, { color: Colors[theme].text }]}>-30s</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.skipBtn, { backgroundColor: Colors[theme].primary }]} onPress={() => router.back()}>
          <Text style={styles.skipText}>Omitir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: Colors[theme].surface }]}>
          <Text style={[styles.controlText, { color: Colors[theme].text }]}>+30s</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.xxl,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: Radius.round,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlBtn: {
    width: 80,
    height: 80,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipBtn: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderRadius: Radius.round,
  },
  skipText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
