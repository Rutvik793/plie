import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from '../screens/SearchScreen';
import EventScreen from '../screens/EventScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

function TabbarNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size, focused}) => {
          let iconName, IconComponent;

          // Assign the appropriate icon name and library
          switch (route.name) {
            case 'Search':
              IconComponent = Feather; // Use Feather for Search
              iconName = 'search';
              break;
            case 'Events':
              IconComponent = Icon; // Use FontAwesome for Events
              iconName = 'calendar';
              break;
            case 'Favourites':
              IconComponent = focused ? Icon : Icon;
              iconName = focused ? 'heart' : 'heart-o';
              break;
            case 'Profile':
              IconComponent = Feather; // Use Feather for Profile
              iconName = 'user';
              break;
            default:
              IconComponent = Icon; // Default fallback icon library
              iconName = 'circle';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
      })}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabbarNavigation;
