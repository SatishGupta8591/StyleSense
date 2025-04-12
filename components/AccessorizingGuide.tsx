import React, { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

const ACCESSORY_COMBINATIONS = {
  men: [
    {
      id: 'm1',
      title: 'Business Professional',
      mainPiece: 'Navy Suit',
      accessories: [
        { name: 'Silver Watch', icon: 'clock', color: '#C0C0C0' },
        { name: 'Burgundy Tie', icon: 'user-tie', color: '#800020' },
        { name: 'Black Belt', icon: 'ring', color: '#000000' }
      ],
      occasion: 'Office, Formal Events'
    },
    {
      id: 'm2',
      title: 'Smart Casual',
      mainPiece: 'Blazer & Jeans',
      accessories: [
        { name: 'Brown Leather Belt', icon: 'ring', color: '#8B4513' },
        { name: 'Pocket Square', icon: 'square', color: '#4169E1' },
        { name: 'Leather Bracelet', icon: 'circle', color: '#8B4513' }
      ],
      occasion: 'Dinner, Social Events'
    },
    // Add more men's combinations...
  ],
  women: [
    {
      id: 'w1',
      title: 'Evening Glamour',
      mainPiece: 'Black Dress',
      accessories: [
        { name: 'Gold Statement Necklace', icon: 'gem', color: '#FFD700' },
        { name: 'Crystal Earrings', icon: 'star', color: '#E0E0E0' },
        { name: 'Metallic Clutch', icon: 'shopping-bag', color: '#C0C0C0' }
      ],
      occasion: 'Formal Events, Parties'
    },
    {
      id: 'w2',
      title: 'Office Chic',
      mainPiece: 'Pencil Skirt & Blouse',
      accessories: [
        { name: 'Pearl Necklace', icon: 'circle', color: '#FFFFFF' },
        { name: 'Leather Belt', icon: 'ring', color: '#000000' },
        { name: 'Stud Earrings', icon: 'dot-circle', color: '#FFD700' }
      ],
      occasion: 'Work, Business Meetings'
    },
    // Add more women's combinations...
  ]
};

interface AccessorizingGuideProps {
  visible: boolean;
  onClose: () => void;
}

export default function AccessorizingGuide({ visible, onClose }: AccessorizingGuideProps) {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('women');
  const [savedCombos, setSavedCombos] = useState<string[]>([]);

  const renderAccessoryCombo = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.comboCard,
        savedCombos.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => {
        setSavedCombos(prev => 
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id]
        );
      }}
    >
      <View style={styles.comboHeader}>
        <ThemedText style={styles.comboTitle}>{item.title}</ThemedText>
        {savedCombos.includes(item.id) && (
          <MaterialIcons name="favorite" size={24} color="#FF4C94" />
        )}
      </View>

      <View style={styles.mainPiece}>
        <MaterialIcons name="checkroom" size={24} color="#666666" />
        <ThemedText style={styles.mainPieceText}>{item.mainPiece}</ThemedText>
      </View>

      <View style={styles.accessoriesList}>
        {item.accessories.map((acc: any, index: number) => (
          <View key={index} style={styles.accessoryItem}>
            <FontAwesome5 name={acc.icon} size={16} color={acc.color} />
            <ThemedText style={styles.accessoryName}>{acc.name}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.occasionTag}>
        <MaterialIcons name="event" size={16} color="#FF4C94" />
        <ThemedText style={styles.occasionText}>{item.occasion}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>Accessorizing Guide</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333333" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            {['women', 'men'].map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.tab,
                  selectedGender === gender && styles.selectedTab
                ]}
                onPress={() => setSelectedGender(gender as 'men' | 'women')}
              >
                <FontAwesome5
                  name={gender === 'women' ? 'female' : 'male'}
                  size={20}
                  color={selectedGender === gender ? '#FF4C94' : '#666666'}
                />
                <ThemedText style={[
                  styles.tabText,
                  selectedGender === gender && styles.selectedTabText
                ]}>
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={ACCESSORY_COMBINATIONS[selectedGender]}
            renderItem={renderAccessoryCombo}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {savedCombos.length > 0 && (
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="check" size={24} color="#FFFFFF" />
              <ThemedText style={styles.saveButtonText}>
                Save {savedCombos.length} Combinations
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666666',
  },
  selectedTabText: {
    color: '#FF4C94',
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 8,
  },
  comboCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#FFF5F8',
    borderColor: '#FF4C94',
  },
  comboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  comboTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  mainPiece: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  mainPieceText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  accessoriesList: {
    gap: 8,
  },
  accessoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  accessoryName: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666666',
  },
  occasionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  occasionText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666666',
  },
  saveButton: {
    backgroundColor: '#FF4C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});