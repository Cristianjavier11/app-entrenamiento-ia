import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TimerScreen() {
  const theme = useColorScheme() ?? 'light';
  
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const setQuickTime = (seconds: number) => {
    setTimeLeft(seconds);
    setIsActive(false);
  };

  const handleCustomTimeSubmit = () => {
    const parsed = parseInt(customTime, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setTimeLeft(parsed);
      setIsActive(false);
      setCustomTime('');
    }
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]} contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Temporizador de Descanso</Text>

      <View style={styles.displayContainer}>
        <Text style={[styles.timerText, { color: Colors[theme].text }]}>
          {formatTime(timeLeft)}
        </Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlButton, { backgroundColor: isActive ? Colors[theme].border : Colors[theme].primary }]} 
          onPress={toggleTimer}
        >
          <Ionicons name={isActive ? "pause" : "play"} size={28} color={isActive ? Colors[theme].text : "#fff"} />
          <Text style={[styles.controlButtonText, { color: isActive ? Colors[theme].text : "#fff" }]}>
            {isActive ? 'Pausar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border, borderWidth: 1 }]} 
          onPress={resetTimer}
        >
          <Ionicons name="refresh" size={28} color={Colors[theme].text} />
          <Text style={[styles.controlButtonText, { color: Colors[theme].text }]}>Reiniciar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickTimesContainer}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Tiempos Rápidos</Text>
        <View style={styles.quickTimeButtonsRow}>
          <TouchableOpacity style={[styles.quickTimeButton, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]} onPress={() => setQuickTime(30)}>
            <Text style={[styles.quickTimeText, { color: Colors[theme].text }]}>30s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickTimeButton, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]} onPress={() => setQuickTime(60)}>
            <Text style={[styles.quickTimeText, { color: Colors[theme].text }]}>60s</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickTimeButton, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]} onPress={() => setQuickTime(90)}>
            <Text style={[styles.quickTimeText, { color: Colors[theme].text }]}>90s</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.customTimeContainer}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Tiempo Personalizado (segundos)</Text>
        <View style={styles.customTimeRow}>
          <TextInput
            style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border, backgroundColor: Colors[theme].surface }]}
            placeholder="Ej: 120"
            placeholderTextColor={Colors[theme].textSecondary}
            keyboardType="numeric"
            value={customTime}
            onChangeText={setCustomTime}
          />
          <TouchableOpacity 
            style={[styles.setButton, { backgroundColor: Colors[theme].primary }]} 
            onPress={handleCustomTimeSubmit}
          >
            <Text style={styles.setButtonText}>Fijar</Text>
          </TouchableOpacity>
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
  contentContainer: {
    paddingBottom: Spacing.xxl + 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Spacing.xxl,
    textAlign: 'center',
  },
  displayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  timerText: {
    fontSize: 96,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.sm,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickTimesContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  quickTimeButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  quickTimeButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  quickTimeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  customTimeContainer: {
    marginBottom: Spacing.xl,
  },
  customTimeRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 18,
  },
  setButton: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
  },
  setButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
