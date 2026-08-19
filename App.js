import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import ListingDetailScreen from './src/screens/ListingDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AuthScreen from './src/screens/AuthScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import CreateListingScreen from './src/screens/CreateListingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  const icons = { Home: '🏠', Favorites: '❤️', Profile: '👤' };
  return <Text style={{ fontSize: focused ? 22 : 20 }}>{icons[label] || '•'}</Text>;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon label={route.name} focused={focused} />,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={HomeTabs} />
          <Stack.Screen name="ListingDetail" component={ListingDetailScreen} />
          <Stack.Screen name="CreateListing" component={CreateListingScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </AuthProvider>
  );
}
