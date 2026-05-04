import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { useWorkouts } from '@/context/WorkoutContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';

interface PersonalRecord {
  id: string;
  ejercicio: string;
  peso: string;
}

const PR_STORAGE_KEY = '@personal_records';

export default function ProgressScreen() {
  const theme = useColorScheme() ?? 'light';
  const { workouts } = useWorkouts();
  const screenWidth = Dimensions.get("window").width;

  // Personal Records State
  const [records, setRecords] = useState<PersonalRecord[]>([]);
  const [isAddingPR, setIsAddingPR] = useState(false);
  const [newPrExercise, setNewPrExercise] = useState('');
  const [newPrWeight, setNewPrWeight] = useState('');

  // Chart State
  const uniqueExercises = useMemo(() => Array.from(new Set(workouts.map(w => w.ejercicio))), [workouts]);
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  useEffect(() => {
    if (uniqueExercises.length > 0 && !uniqueExercises.includes(selectedExercise)) {
      setSelectedExercise(uniqueExercises[0]);
    }
  }, [uniqueExercises]);

  // Load PRs
  useEffect(() => {
    const loadPRs = async () => {
      try {
        const stored = await AsyncStorage.getItem(PR_STORAGE_KEY);
        if (stored) setRecords(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load PRs', e);
      }
    };
    loadPRs();
  }, []);

  // Save PRs
  const savePRs = async (newRecords: PersonalRecord[]) => {
    setRecords(newRecords);
    try {
      await AsyncStorage.setItem(PR_STORAGE_KEY, JSON.stringify(newRecords));
    } catch (e) {
      console.error('Failed to save PRs', e);
    }
  };

  // Calculate Streak
  const streak = useMemo(() => {
    if (workouts.length === 0) return 0;
    const dates = Array.from(new Set(workouts.map(w => w.fecha.toISOString().split('T')[0]))).sort().reverse();
    
    let currentStreak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    today.setDate(today.getDate() - 1);
    const yesterdayStr = today.toISOString().split('T')[0];

    let checkDate = new Date();
    if (!dates.includes(todayStr) && !dates.includes(yesterdayStr)) {
      return 0;
    }

    if (!dates.includes(todayStr) && dates.includes(yesterdayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dStr = checkDate.toISOString().split('T')[0];
      if (dates.includes(dStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return currentStreak;
  }, [workouts]);

  // Calculate Volume
  const volume = useMemo(() => {
    return workouts.reduce((sum, w) => sum + (w.series * w.repeticiones * w.peso), 0);
  }, [workouts]);

  const handleAddPR = () => {
    if (!newPrExercise.trim() || !newPrWeight.trim()) {
      Alert.alert('Error', 'Completa ambos campos');
      return;
    }
    const newRecord: PersonalRecord = {
      id: Date.now().toString(),
      ejercicio: newPrExercise.trim(),
      peso: newPrWeight.trim(),
    };
    savePRs([...records, newRecord]);
    setIsAddingPR(false);
    setNewPrExercise('');
    setNewPrWeight('');
  };

  const handleDeletePR = (id: string) => {
    Alert.alert('Eliminar', '¿Eliminar este récord?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        savePRs(records.filter(r => r.id !== id));
      }}
    ]);
  };

  // Chart Data
  const chartData = useMemo(() => {
    if (!selectedExercise) return null;
    const history = workouts
      .filter(w => w.ejercicio === selectedExercise)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());
    
    if (history.length < 2) return null; // Need at least 2 points for a line chart

    return {
      labels: history.map(w => w.fecha.toISOString().split('T')[0].slice(5)), // MM-DD
      datasets: [{
        data: history.map(w => w.peso)
      }]
    };
  }, [workouts, selectedExercise]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Progreso</Text>
      
      <View style={styles.grid}>
        <View style={[styles.statCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <Ionicons name="flame" size={32} color={Colors[theme].primary} />
          <Text style={[styles.statValue, { color: Colors[theme].text }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>Racha de días</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <Ionicons name="barbell" size={32} color="#3b82f6" />
          <Text style={[styles.statValue, { color: Colors[theme].text }]}>{volume >= 1000 ? (volume/1000).toFixed(1) + 'K' : volume}</Text>
          <Text style={[styles.statLabel, { color: Colors[theme].textSecondary }]}>Kg levantados</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Gráfica de Progreso</Text>
      </View>
      
      {uniqueExercises.length === 0 ? (
        <Text style={{ color: Colors[theme].textSecondary, marginBottom: Spacing.xl }}>No hay historial para graficar.</Text>
      ) : (
        <View style={{ marginBottom: Spacing.xl }}>
          <View style={[styles.pickerContainer, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
            <Picker
              selectedValue={selectedExercise}
              onValueChange={(itemValue) => setSelectedExercise(itemValue)}
              style={{ color: Colors[theme].text }}
              dropdownIconColor={Colors[theme].text}
              itemStyle={{ color: Colors[theme].text }}
            >
              {uniqueExercises.map((ex, idx) => (
                <Picker.Item key={idx} label={ex} value={ex} color={theme === 'dark' ? '#fff' : '#000'} />
              ))}
            </Picker>
          </View>

          {chartData ? (
            <View style={{ marginTop: Spacing.md, borderRadius: Radius.md, overflow: 'hidden' }}>
              <LineChart
                data={chartData}
                width={screenWidth - Spacing.lg * 2}
                height={220}
                chartConfig={{
                  backgroundColor: Colors[theme].surface,
                  backgroundGradientFrom: Colors[theme].surface,
                  backgroundGradientTo: Colors[theme].surface,
                  decimalPlaces: 1,
                  color: (opacity = 1) => Colors[theme].primary,
                  labelColor: (opacity = 1) => Colors[theme].textSecondary,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: Colors[theme].primary
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
          ) : (
            <Text style={{ color: Colors[theme].textSecondary, marginTop: Spacing.md }}>Registra al menos 2 sesiones de "{selectedExercise}" para ver la gráfica.</Text>
          )}
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>Récords Personales</Text>
        <TouchableOpacity onPress={() => setIsAddingPR(!isAddingPR)}>
          <Ionicons name={isAddingPR ? "close" : "add"} size={24} color={Colors[theme].primary} />
        </TouchableOpacity>
      </View>

      {isAddingPR && (
        <View style={[styles.addPrContainer, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
          <TextInput 
            style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
            placeholder="Ejercicio (Ej. Sentadilla)"
            placeholderTextColor={Colors[theme].textSecondary}
            value={newPrExercise}
            onChangeText={setNewPrExercise}
          />
          <View style={{ flexDirection: 'row', gap: Spacing.sm }}>
            <TextInput 
              style={[styles.input, { flex: 1, color: Colors[theme].text, borderColor: Colors[theme].border }]}
              placeholder="Peso (kg)"
              keyboardType="numeric"
              placeholderTextColor={Colors[theme].textSecondary}
              value={newPrWeight}
              onChangeText={setNewPrWeight}
            />
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: Colors[theme].primary }]} onPress={handleAddPR}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.recordList, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        {records.length === 0 ? (
          <Text style={{ color: Colors[theme].textSecondary, padding: Spacing.sm }}>No hay récords personales agregados.</Text>
        ) : (
          records.map((record, index) => (
            <View key={record.id} style={[styles.recordItem, index > 0 && { borderTopWidth: 1, borderTopColor: Colors[theme].border }]}>
              <View>
                <Text style={[styles.recordName, { color: Colors[theme].text }]}>{record.ejercicio}</Text>
                <Text style={[styles.recordValue, { color: Colors[theme].primary }]}>{record.peso} kg</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeletePR(record.id)}>
                <Ionicons name="trash-outline" size={20} color={Colors[theme].danger} />
              </TouchableOpacity>
            </View>
          ))
        )}
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
  sectionHeader: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  addPrContainer: {
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  saveBtn: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  recordList: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
