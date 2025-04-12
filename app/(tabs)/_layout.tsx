import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Dimensions, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SwipeableTabContainer from '@/components/SwipeableTabContainer';
import { usePathname } from 'expo-router';
import AnimatedBackground from '@/components/AnimatedBackground';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  return (
    <View style={{ flex: 1 }}>
      <AnimatedBackground />
      <SwipeableTabContainer currentRoute={pathname}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#FF4C94',
            tabBarInactiveTintColor: '#9B9B9B',
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: 'absolute',
                height: isSmallDevice ? 70 : 80,
                paddingBottom: insets.bottom,
                borderTopWidth: 0,
                elevation: 0,
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              },
              default: {
                height: isSmallDevice ? 60 : 70,
                borderTopWidth: 0,
                elevation: 4,
                backgroundColor: '#FFFFFF',
                paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
              },
            }),
            tabBarLabelStyle: {
              fontSize: isSmallDevice ? 10 : 12,
              fontWeight: '600',
              marginBottom: Platform.OS === 'ios' ? 0 : insets.bottom,
            },
            tabBarIconStyle: {
              marginTop: Platform.OS === 'ios' ? 0 : 5,
            },
            tabBarItemStyle: {
              paddingVertical: isSmallDevice ? 6 : 8,
            },
            animationEnabled: true,
            animation: Platform.OS === 'ios' ? 'default' : 'fade',
            animationDuration: 200, // Slower animation
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <IconSymbol 
                  size={isSmallDevice ? 24 : 28} 
                  name="house.fill" 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="wardrobe"
            options={{
              title: 'Wardrobe',
              tabBarIcon: ({ color }) => (
                <IconSymbol 
                  size={isSmallDevice ? 24 : 28} 
                  name="tshirt.fill" 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: '',
              tabBarIcon: ({ color }) => (
                <AntDesign 
                  name="pluscircleo" 
                  size={isSmallDevice ? 24 : 28} 
                  color={color}
                  style={{
                    alignSelf: 'center',
                    marginBottom: Platform.OS === 'ios' ? 3 : 0,
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="style"
            options={{
              title: 'Style',
              tabBarIcon: ({ color }) => (
                <IconSymbol 
                  size={isSmallDevice ? 24 : 28} 
                  name="sparkles" 
                  color={color} 
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => (
                <IconSymbol 
                  size={isSmallDevice ? 24 : 28} 
                  name="person.fill" 
                  color={color} 
                />
              ),
            }}
          />
        </Tabs>
      </SwipeableTabContainer>
    </View>
  );
}