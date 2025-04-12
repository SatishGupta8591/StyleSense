import React, { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

const SUSTAINABLE_FASHION = {
  men: [
    {
      id: 'm1',
      title: 'Eco Casual Collection',
      brand: 'GreenThread',
      sustainability: '100% Organic Materials',
      materials: ['Organic Cotton', 'Hemp', 'Natural Dyes'],
      description: 'Ethically made casual wear perfect for everyday use',
      items: [
        {
          name: 'Hemp Blend T-Shirt',
          material: 'Hemp & Organic Cotton',
          impact: 'Saves 2900L water per shirt',
          icon: 'tshirt',
          color: '#4CAF50'
        },
        {
          name: 'Recycled Denim Jeans',
          material: 'Recycled Cotton & Hemp',
          impact: '12 plastic bottles recycled',
          icon: 'user',
          color: '#1976D2'
        }
      ],
      certification: 'GOTS Certified'
    },
    // Add more men's items...
  ],
  women: [
    {
      id: 'w1',
      title: 'Sustainable Elegance',
      brand: 'EcoChic',
      sustainability: 'Zero Waste Production',
      materials: ['Tencel', 'Recycled Polyester', 'Organic Silk'],
      description: 'Elegant workwear made with eco-conscious materials',
      items: [
        {
          name: 'Tencel Blazer',
          material: 'Lyocell Tencel',
          impact: 'Closed-loop production',
          icon: 'user-tie',
          color: '#9C27B0'
        },
        {
          name: 'Eco Silk Blouse',
          material: 'Peace Silk',
          impact: 'Cruelty-free production',
          icon: 'tshirt',
          color: '#FF4081'
        }
      ],
      certification: 'Fair Trade Certified'
    },
    // Add more women's items...
  ]
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SustainableFashionGuide({ visible, onClose }: Props) {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('women');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const renderSustainableItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.itemCard,
        savedItems.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => {
        setSavedItems(prev => 
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id]
        );
      }}
    >
      <View style={styles.itemHeader}>
        <View>
          <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.brandText}>{item.brand}</ThemedText>
        </View>
      </View>

      <View style={styles.sustainabilityBadge}>
        <MaterialIcons name="eco" size={16} color="#4CAF50" />
        <ThemedText style={styles.sustainabilityText}>
          {item.sustainability}
        </ThemedText>
      </View>

      <View style={styles.materialsContainer}>
        {item.materials.map((material: string, index: number) => (
          <View key={index} style={styles.materialTag}>
            <MaterialIcons name="fiber-smart-record" size={14} color="#4CAF50" />
            <ThemedText style={styles.materialText}>{material}</ThemedText>
          </View>
        ))}
      </View>

      <ThemedText style={styles.descriptionText}>{item.description}</ThemedText>

      <View style={styles.itemsList}>
        {item.items.map((piece: any, index: number) => (
          <View key={index} style={styles.itemPiece}>
            <FontAwesome5 name={piece.icon} size={20} color={piece.color} />
            <View style={styles.pieceDetails}>
              <ThemedText style={styles.pieceName}>{piece.name}</ThemedText>
              <ThemedText style={styles.pieceMaterial}>{piece.material}</ThemedText>
              <View style={styles.impactTag}>
                <MaterialIcons name="eco" size={12} color="#4CAF50" />
                <ThemedText style={styles.impactText}>{piece.impact}</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.certificationTag}>
        <MaterialIcons name="verified" size={16} color="#4CAF50" />
        <ThemedText style={styles.certificationText}>
          {item.certification}
        </ThemedText>
      </View>

      {savedItems.includes(item.id) && (
        <MaterialIcons 
          name="favorite" 
          size={24} 
          color="#FF4C94" 
          style={styles.favoriteIcon}
        />
      )}
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
            <View>
              <ThemedText style={styles.title}>Sustainable Fashion</ThemedText>
              <ThemedText style={styles.subtitle}>
                Eco-friendly & Ethically Made
              </ThemedText>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
                  color={selectedGender === gender ? '#4CAF50' : '#666666'}
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
            data={SUSTAINABLE_FASHION[selectedGender]}
            renderItem={renderSustainableItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {savedItems.length > 0 && (
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="eco" size={24} color="#FFFFFF" />
              <ThemedText style={styles.saveButtonText}>
                Save {savedItems.length} Sustainable Items
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  closeButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  selectedTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666666',
  },
  selectedTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#F1F8E9',
    borderColor: '#4CAF50',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  brandText: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  sustainabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sustainabilityText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontSize: 14,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  materialTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  materialText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  itemsList: {
    gap: 12,
  },
  itemPiece: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },
  pieceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  pieceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  pieceMaterial: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  impactTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  impactText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#4CAF50',
  },
  certificationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  certificationText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#4CAF50',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
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