import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WorkoutLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: Colors[colorScheme].background,
      },
      headerTintColor: Colors[colorScheme].text,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen 
        name="active" 
        options={{ 
          title: 'Entrenando',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <Ionicons name="close" size={28} color={Colors[colorScheme].text} />
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen 
        name="rest" 
        options={{ 
          presentation: 'modal',
          title: 'Descanso' 
        }} 
      />
    </Stack>
  );
}
