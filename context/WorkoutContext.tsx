import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RegistroEntrenamiento {
  id: string;
  ejercicio: string;
  series: number;
  repeticiones: number;
  peso: number;
  fecha: Date;
}

interface WorkoutContextType {
  workouts: RegistroEntrenamiento[];
  addWorkout: (workout: RegistroEntrenamiento) => Promise<void>;
  isLoading: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
const WORKOUTS_STORAGE_KEY = '@workouts_history';

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<RegistroEntrenamiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const stored = await AsyncStorage.getItem(WORKOUTS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const formatted = parsed.map((item: any) => ({
            ...item,
            fecha: new Date(item.fecha),
          }));
          setWorkouts(formatted);
        }
      } catch (error) {
        console.error('Error loading workouts from storage', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  const addWorkout = async (workout: RegistroEntrenamiento) => {
    try {
      const newWorkouts = [workout, ...workouts];
      setWorkouts(newWorkouts);
      await AsyncStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(newWorkouts));
    } catch (error) {
      console.error('Error saving workout to storage', error);
    }
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, isLoading }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}
