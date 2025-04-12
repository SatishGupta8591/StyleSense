import { StyleSheet, View, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STATS = [
  { id: '1', title: 'Outfits', count: 48 },
  { id: '2', title: 'Items', count: 126 },
  { id: '3', title: 'Shared', count: 15 },
];

const WARDROBE_SUMMARY = [
  { id: '1', category: 'Tops', count: 35, icon: 'tshirt' },
  { id: '2', category: 'Bottoms', count: 24, icon: 'tshirt' },
  { id: '3', category: 'Shoes', count: 12, icon: 'shoe-prints' },
  { id: '4', category: 'Accessories', count: 18, icon: 'glasses' },
];

export default function ProfileScreen() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userName, setUserName] = useState('Sarah Johnson');
  const [userBio, setUserBio] = useState('Fashion enthusiast | Style blogger');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  // Add permission check for image picker
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images.');
      }
    })();
  }, []);

  // Update image picker with error handling
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error('Error picking image:', error);
    }
  };

  // Add save profile function
  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify({
        name: userName,
        bio: userBio,
        image: profileImage
      }));
      setIsEditMode(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
      console.error('Error saving profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={pickImage}
          >
            <MaterialIcons name="photo-camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {isEditMode ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              placeholderTextColor="#666666"
            />
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={userBio}
              onChangeText={setUserBio}
              placeholder="Enter your bio"
              placeholderTextColor="#666666"
              multiline
            />
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <MaterialIcons name="check" size={20} color="#FFFFFF" />
              <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <ThemedText style={styles.username}>{userName}</ThemedText>
            <ThemedText style={styles.userBio}>{userBio}</ThemedText>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => setIsEditMode(true)}
            >
              <MaterialIcons name="edit" size={20} color="#FFFFFF" />
              <ThemedText style={styles.editButtonText}>Edit Profile</ThemedText>
            </TouchableOpacity>
          </View>
        )}
        
        {/* User Stats */}
        <View style={styles.statsContainer}>
          {USER_STATS.map((stat) => (
            <View key={stat.id} style={styles.statItem}>
              <ThemedText style={styles.statCount}>{stat.count}</ThemedText>
              <ThemedText style={styles.statTitle}>{stat.title}</ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Wardrobe Summary */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="checkroom" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>My Wardrobe</ThemedText>
        </View>
        <View style={styles.wardrobeGrid}>
          {WARDROBE_SUMMARY.map((item) => (
            <View key={item.id} style={styles.wardrobeItem}>
              <FontAwesome5 name={item.icon} size={24} color="#FF4C94" />
              <ThemedText style={styles.itemCount}>{item.count}</ThemedText>
              <ThemedText style={styles.itemCategory}>{item.category}</ThemedText>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.viewWardrobeButton}>
          <ThemedText style={styles.viewWardrobeText}>View All Items</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Style Preferences */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="style" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Style Preferences</ThemedText>
        </View>
        <View style={styles.preferencesCard}>
          <TouchableOpacity style={styles.preferenceItem}>
            <MaterialIcons name="color-lens" size={24} color="#666666" />
            <ThemedText style={styles.preferenceText}>Favorite Colors</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.preferenceItem}>
            <MaterialIcons name="category" size={24} color="#666666" />
            <ThemedText style={styles.preferenceText}>Style Categories</ThemedText>
            <MaterialIcons name="chevron-right" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Activity & Notifications */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="notifications" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
        </View>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <MaterialIcons name="local-activity" size={20} color="#FF4C94" />
            <ThemedText style={styles.activityText}>Added 3 new items today</ThemedText>
          </View>
          <View style={styles.activityItem}>
            <MaterialIcons name="favorite" size={20} color="#FF4C94" />
            <ThemedText style={styles.activityText}>Saved 2 outfit ideas</ThemedText>
          </View>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.settingButton}>
          <MaterialIcons name="settings" size={24} color="#666666" />
          <ThemedText style={styles.settingText}>App Settings</ThemedText>
          <MaterialIcons name="chevron-right" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <MaterialIcons name="security" size={24} color="#666666" />
          <ThemedText style={styles.settingText}>Privacy Settings</ThemedText>
          <MaterialIcons name="chevron-right" size={24} color="#666666" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingButton, styles.logoutButton]}>
          <MaterialIcons name="logout" size={24} color="#FF4C94" />
          <ThemedText style={[styles.settingText, { color: '#FF4C94' }]}>Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF4C94',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333333',
  },
  wardrobeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  wardrobeItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 8,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666666',
  },
  viewWardrobeButton: {
    backgroundColor: '#FF4C94',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewWardrobeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 20,
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  input: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4C94',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  editButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});