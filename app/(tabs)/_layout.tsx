import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="entrenar"
        options={{
          title: 'Entrenar',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="fitness" color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Descanso',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="timer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Rutinas',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Ejercicios',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="barbell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="time" color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="trending-up" color={color} />,
        }}
      />
    </Tabs>
  );
}
