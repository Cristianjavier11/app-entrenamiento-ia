import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useWorkouts, RegistroEntrenamiento } from '@/context/WorkoutContext';

export default function EntrenarScreen() {
  const theme = useColorScheme() ?? 'light';

  const [ejercicio, setEjercicio] = useState<string>('');
  const [series, setSeries] = useState<string>('');
  const [repeticiones, setRepeticiones] = useState<string>('');
  const [peso, setPeso] = useState<string>('');
  const [fechaString, setFechaString] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const { workouts, addWorkout } = useWorkouts();

  const handleGuardar = () => {
    if (!ejercicio.trim() || !series.trim() || !repeticiones.trim() || !peso.trim() || !fechaString.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const parsedDate = new Date(fechaString);
    if (isNaN(parsedDate.getTime())) {
      Alert.alert('Error', 'La fecha ingresada no es válida (Formato: YYYY-MM-DD).');
      return;
    }

    const newWorkout: RegistroEntrenamiento = {
      id: Date.now().toString(),
      ejercicio: ejercicio.trim(),
      series: Number(series),
      repeticiones: Number(repeticiones),
      peso: Number(peso),
      fecha: parsedDate,
    };

    addWorkout(newWorkout);

    Alert.alert('Éxito', 'Entrenamiento guardado correctamente');

    // Limpiar formulario
    setEjercicio('');
    setSeries('');
    setRepeticiones('');
    setPeso('');
    setFechaString(new Date().toISOString().split('T')[0]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Registrar Entrenamiento</Text>

      <View style={[styles.formContainer, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
        
        <Text style={[styles.label, { color: Colors[theme].text }]}>Ejercicio</Text>
        <TextInput
          style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
          placeholder="Ej: Sentadilla"
          placeholderTextColor={Colors[theme].textSecondary}
          value={ejercicio}
          onChangeText={setEjercicio}
        />

        <Text style={[styles.label, { color: Colors[theme].text }]}>Series</Text>
        <TextInput
          style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
          placeholder="Ej: 4"
          placeholderTextColor={Colors[theme].textSecondary}
          keyboardType="numeric"
          value={series}
          onChangeText={setSeries}
        />

        <Text style={[styles.label, { color: Colors[theme].text }]}>Repeticiones</Text>
        <TextInput
          style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
          placeholder="Ej: 12"
          placeholderTextColor={Colors[theme].textSecondary}
          keyboardType="numeric"
          value={repeticiones}
          onChangeText={setRepeticiones}
        />

        <Text style={[styles.label, { color: Colors[theme].text }]}>Peso (kg)</Text>
        <TextInput
          style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
          placeholder="Ej: 40"
          placeholderTextColor={Colors[theme].textSecondary}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <Text style={[styles.label, { color: Colors[theme].text }]}>Fecha (YYYY-MM-DD)</Text>
        <TextInput
          style={[styles.input, { color: Colors[theme].text, borderColor: Colors[theme].border }]}
          placeholder="Ej: 2026-05-03"
          placeholderTextColor={Colors[theme].textSecondary}
          value={fechaString}
          onChangeText={setFechaString}
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[theme].primary }]} 
          onPress={handleGuardar}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      {workouts.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={[styles.subtitle, { color: Colors[theme].text }]}>Entrenamientos Recientes</Text>
          {workouts.map((item) => (
            <View key={item.id} style={[styles.workoutItem, { backgroundColor: Colors[theme].surface, borderColor: Colors[theme].border }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.workoutTitle, { color: Colors[theme].text }]}>{item.ejercicio}</Text>
                <Text style={{ color: Colors[theme].textSecondary, fontSize: 12 }}>
                  {item.fecha.toISOString().split('T')[0]}
                </Text>
              </View>
              <Text style={{ color: Colors[theme].textSecondary }}>
                {item.series} series x {item.repeticiones} reps @ {item.peso} kg
              </Text>
            </View>
          ))}
        </View>
      )}
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  formContainer: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
    fontSize: 16,
    marginBottom: Spacing.md,
  },
  button: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  workoutItem: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});
