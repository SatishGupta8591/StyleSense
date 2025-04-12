import React, { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

const SPRING_FASHION_2024 = {
  men: [
    {
      id: 'm1',
      title: 'Spring Casual Cool',
      trend: 'Pastel Minimalism',
      category: 'Casual Wear',
      items: [
        { name: 'Linen Shirt', icon: 'tshirt', color: '#B5EAD7' },
        { name: 'Cotton Chinos', icon: 'user', color: '#FFDAC1' },
        { name: 'Suede Loafers', icon: 'shoe-prints', color: '#C7CEEA' }
      ],
      style: 'Light layers with breathable fabrics'
    },
    {
      id: 'm2',
      title: 'Urban Spring',
      trend: 'Street Style',
      category: 'Street Fashion',
      items: [
        { name: 'Denim Jacket', icon: 'user', color: '#1976D2' },
        { name: 'Graphic Tee', icon: 'tshirt', color: '#FF4081' },
        { name: 'Cargo Pants', icon: 'user', color: '#78909C' }
      ],
      style: 'Contemporary urban aesthetics'
    },
    // Add more men's trends...
  ],
  women: [
    {
      id: 'w1',
      title: 'Spring Bloom',
      trend: 'Floral Prints',
      category: 'Daytime Chic',
      items: [
        { name: 'Floral Dress', icon: 'user', color: '#FF97C1' },
        { name: 'Straw Hat', icon: 'hat-cowboy', color: '#E6D7B8' },
        { name: 'Espadrilles', icon: 'shoe-prints', color: '#B5EAD7' }
      ],
      style: 'Romantic spring florals'
    },
    {
      id: 'w2',
      title: 'Modern Pastel',
      trend: 'Color Blocking',
      category: 'Contemporary',
      items: [
        { name: 'Blazer', icon: 'user-tie', color: '#FFAAA5' },
        { name: 'Wide Leg Pants', icon: 'user', color: '#A8E6CF' },
        { name: 'Mules', icon: 'shoe-prints', color: '#FFD3B6' }
      ],
      style: 'Fresh color combinations'
    },
    // Add more women's trends...
  ]
};

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SpringFashionGuide({ visible, onClose }: Props) {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('women');
  const [savedOutfits, setSavedOutfits] = useState<string[]>([]);

  const renderTrendingOutfit = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.outfitCard,
        savedOutfits.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => {
        setSavedOutfits(prev => 
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id]
        );
      }}
    >
      <View style={styles.outfitHeader}>
        <View>
          <ThemedText style={styles.outfitTitle}>{item.title}</ThemedText>
          <View style={styles.trendBadge}>
            <MaterialIcons name="trending-up" size={16} color="#FF4C94" />
            <ThemedText style={styles.trendText}>{item.trend}</ThemedText>
          </View>
        </View>
        {savedOutfits.includes(item.id) && (
          <MaterialIcons name="favorite" size={24} color="#FF4C94" />
        )}
      </View>

      <View style={styles.categoryTag}>
        <MaterialIcons name="style" size={16} color="#666666" />
        <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
      </View>

      <View style={styles.itemsList}>
        {item.items.map((piece: any, index: number) => (
          <View key={index} style={styles.itemPiece}>
            <FontAwesome5 name={piece.icon} size={20} color={piece.color} />
            <ThemedText style={styles.pieceName}>{piece.name}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.styleNote}>
        <MaterialIcons name="lightbulb" size={16} color="#FFB300" />
        <ThemedText style={styles.styleText}>{item.style}</ThemedText>
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
            <View>
              <ThemedText style={styles.title}>Spring Fashion 2024</ThemedText>
              <ThemedText style={styles.subtitle}>Trending Looks</ThemedText>
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
            data={SPRING_FASHION_2024[selectedGender]}
            renderItem={renderTrendingOutfit}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {savedOutfits.length > 0 && (
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="check" size={24} color="#FFFFFF" />
              <ThemedText style={styles.saveButtonText}>
                Save {savedOutfits.length} Trending Looks
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
    color: '#FF4C94',
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
    color: '#FF4C94',
    fontWeight: 'bold',
  },
  outfitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#FFF5F8',
    borderColor: '#FF4C94',
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  outfitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  trendText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#FF4C94',
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  itemsList: {
    gap: 8,
  },
  itemPiece: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },
  pieceName: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333333',
  },
  styleNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  styleText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666666',
    flex: 1,
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