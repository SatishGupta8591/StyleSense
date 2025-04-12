import React, { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

const COLOR_COMBINATIONS = {
  men: [
    {
      id: 'm1',
      title: 'Navy & Burgundy Classic',
      primary: '#1B1464',
      secondary: '#800020',
      accent: '#C0C0C0',
      outfit: 'Navy suit with burgundy tie and silver accessories'
    },
    {
      id: 'm2',
      title: 'Grey & Blue Professional',
      primary: '#808080',
      secondary: '#4169E1',
      accent: '#8B4513',
      outfit: 'Grey blazer with blue shirt and brown leather belt'
    },
    {
      id: 'm3',
      title: 'Olive & White Casual',
      primary: '#556B2F',
      secondary: '#FFFFFF',
      accent: '#D4AF37',
      outfit: 'Olive chinos with white oxford and gold watch'
    },
    {
      id: 'm4',
      title: 'Charcoal & Pink Business',
      primary: '#36454F',
      secondary: '#FFB6C1',
      accent: '#000000',
      outfit: 'Charcoal suit with pink shirt and black oxfords'
    },
    {
      id: 'm5',
      title: 'Brown & Cream Smart',
      primary: '#8B4513',
      secondary: '#FFFDD0',
      accent: '#DAA520',
      outfit: 'Brown blazer with cream sweater and gold accessories'
    },
    {
      id: 'm6',
      title: 'Black & Grey Modern',
      primary: '#000000',
      secondary: '#A9A9A9',
      accent: '#C0C0C0',
      outfit: 'Black jeans with grey sweater and silver watch'
    },
    {
      id: 'm7',
      title: 'Tan & White Summer',
      primary: '#D2B48C',
      secondary: '#FFFFFF',
      accent: '#87CEEB',
      outfit: 'Tan linen suit with white shirt and light blue pocket square'
    },
    {
      id: 'm8',
      title: 'Green & Khaki Casual',
      primary: '#228B22',
      secondary: '#C3B091',
      accent: '#8B4513',
      outfit: 'Green polo with khaki shorts and brown loafers'
    },
    {
      id: 'm9',
      title: 'Blue & Grey Sport',
      primary: '#000080',
      secondary: '#D3D3D3',
      accent: '#FF4500',
      outfit: 'Navy track jacket with grey pants and orange accents'
    },
    {
      id: 'm10',
      title: 'Purple & Black Evening',
      primary: '#800080',
      secondary: '#000000',
      accent: '#FFD700',
      outfit: 'Purple dress shirt with black pants and gold cufflinks'
    },
    // Add 10 more men's combinations...
    {
      id: 'm11',
      title: 'Camel & Navy Classic',
      primary: '#C19A6B',
      secondary: '#000080',
      accent: '#B87333',
      outfit: 'Camel coat with navy suit and copper accessories'
    },
    {
      id: 'm12',
      title: 'Red & Grey Power',
      primary: '#CC0000',
      secondary: '#808080',
      accent: '#000000',
      outfit: 'Red tie with grey suit and black shoes'
    },
    // ... continue with m13-m20
  ],
  women: [
    {
      id: 'w1',
      title: 'Blush & Navy Elegant',
      primary: '#FFB6C1',
      secondary: '#000080',
      accent: '#FFD700',
      outfit: 'Blush blouse with navy skirt and gold jewelry'
    },
    {
      id: 'w2',
      title: 'Emerald & Black Power',
      primary: '#50C878',
      secondary: '#000000',
      accent: '#C0C0C0',
      outfit: 'Emerald blazer with black pants and silver accessories'
    },
    {
      id: 'w3',
      title: 'Lavender & White Fresh',
      primary: '#E6E6FA',
      secondary: '#FFFFFF',
      accent: '#DDA0DD',
      outfit: 'Lavender dress with white cardigan and purple scarf'
    },
    {
      id: 'w4',
      title: 'Red & Cream Bold',
      primary: '#FF0000',
      secondary: '#FFFDD0',
      accent: '#FFD700',
      outfit: 'Red dress with cream coat and gold belt'
    },
    {
      id: 'w5',
      title: 'Teal & Grey Modern',
      primary: '#008080',
      secondary: '#808080',
      accent: '#C0C0C0',
      outfit: 'Teal blouse with grey pencil skirt and silver jewelry'
    },
    {
      id: 'w6',
      title: 'Pink & White Romance',
      primary: '#FF69B4',
      secondary: '#FFFFFF',
      accent: '#FFC0CB',
      outfit: 'Pink blazer with white dress and rose quartz necklace'
    },
    {
      id: 'w7',
      title: 'Purple & Black Drama',
      primary: '#800080',
      secondary: '#000000',
      accent: '#FFD700',
      outfit: 'Purple evening gown with black shawl and gold clutch'
    },
    {
      id: 'w8',
      title: 'Coral & Beige Summer',
      primary: '#FF7F50',
      secondary: '#F5F5DC',
      accent: '#00FFFF',
      outfit: 'Coral dress with beige sandals and turquoise jewelry'
    },
    {
      id: 'w9',
      title: 'Mint & Grey Fresh',
      primary: '#98FF98',
      secondary: '#808080',
      accent: '#FFFFFF',
      outfit: 'Mint sweater with grey pants and pearl earrings'
    },
    {
      id: 'w10',
      title: 'Blue & White Classic',
      primary: '#0000FF',
      secondary: '#FFFFFF',
      accent: '#FFD700',
      outfit: 'Blue blazer with white shirt and gold buttons'
    },
    // Add 10 more women's combinations...
    {
      id: 'w11',
      title: 'Burgundy & Cream Luxe',
      primary: '#800020',
      secondary: '#FFFDD0',
      accent: '#B87333',
      outfit: 'Burgundy sweater dress with cream scarf and copper jewelry'
    },
    {
      id: 'w12',
      title: 'Forest & Tan Natural',
      primary: '#228B22',
      secondary: '#D2B48C',
      accent: '#8B4513',
      outfit: 'Forest green dress with tan boots and brown belt'
    },
    // ... continue with w13-w20
  ]
};

interface ColorMatchingGuideProps {
  visible: boolean;
  onClose: () => void;
}

export default function ColorMatchingGuide({ visible, onClose }: ColorMatchingGuideProps) {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('women');
  const [savedCombinations, setSavedCombinations] = useState<string[]>([]);

  const renderColorCombination = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.combinationCard,
        savedCombinations.includes(item.id) && styles.selectedCard
      ]}
      onPress={() => {
        setSavedCombinations(prev => 
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id]
        );
      }}
    >
      <View style={styles.colorPreview}>
        <View style={[styles.colorCircle, { backgroundColor: item.primary }]} />
        <View style={[styles.colorCircle, { backgroundColor: item.secondary }]} />
        <View style={[styles.colorCircle, { backgroundColor: item.accent }]} />
      </View>
      <View style={styles.combinationDetails}>
        <ThemedText style={styles.combinationTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.combinationText}>{item.outfit}</ThemedText>
      </View>
      {savedCombinations.includes(item.id) && (
        <MaterialIcons name="favorite" size={24} color="#FF4C94" />
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
            <ThemedText style={styles.title}>Color Matching Guide</ThemedText>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333333" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[
                styles.tab,
                selectedGender === 'women' && styles.selectedTab
              ]}
              onPress={() => setSelectedGender('women')}
            >
              <FontAwesome5 
                name="female" 
                size={20} 
                color={selectedGender === 'women' ? '#FF4C94' : '#666666'} 
              />
              <ThemedText style={[
                styles.tabText,
                selectedGender === 'women' && styles.selectedTabText
              ]}>Women</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab,
                selectedGender === 'men' && styles.selectedTab
              ]}
              onPress={() => setSelectedGender('men')}
            >
              <FontAwesome5 
                name="male" 
                size={20} 
                color={selectedGender === 'men' ? '#FF4C94' : '#666666'} 
              />
              <ThemedText style={[
                styles.tabText,
                selectedGender === 'men' && styles.selectedTabText
              ]}>Men</ThemedText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={COLOR_COMBINATIONS[selectedGender]}
            renderItem={renderColorCombination}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {savedCombinations.length > 0 && (
            <TouchableOpacity style={styles.saveButton}>
              <MaterialIcons name="check" size={24} color="#FFFFFF" />
              <ThemedText style={styles.saveButtonText}>
                Save {savedCombinations.length} Combinations
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
    paddingHorizontal: 4,
  },
  combinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    backgroundColor: '#FFF5F8',
    borderColor: '#FF4C94',
  },
  colorPreview: {
    flexDirection: 'row',
    marginRight: 12,
    padding: 4,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  combinationDetails: {
    flex: 1,
  },
  combinationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  combinationText: {
    fontSize: 14,
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