import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const backgroundColor = 'white';
  return (
    <Tabs
      screenOptions={{
       

        tabBarActiveTintColor: Colors['light'].tint,
        tabBarStyle: { backgroundColor },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Lista"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name='format-list-bulleted' color={color} size={30} />
          ),
        }}
      />
     
    </Tabs>
    
  );
}
