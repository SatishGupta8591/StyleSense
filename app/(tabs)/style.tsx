import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, AntDesign } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import ColorMatchingGuide from '@/components/ColorMatchingGuide';
import AccessorizingGuide from '@/components/AccessorizingGuide';
import SustainableFashionGuide from '@/components/SustainableFashionGuide';
import { useState } from 'react';

const TRENDING_OUTFITS = [
  { 
    id: '1', 
    title: 'Summer Casual',
    icon: 'sun',
    likes: 234,
    outfits: [
      { name: 'Floral Dress', icon: 'tshirt', color: '#FF4C94' },
      { name: 'Denim Shorts', icon: 'tshirt', color: '#4A90E2' },
      { name: 'Straw Hat', icon: 'hat-cowboy', color: '#F1C40F' },
      { name: 'Sandals', icon: 'shoe-prints', color: '#E67E22' }
    ]
  },
  { 
    id: '2', 
    title: 'Office Chic',
    icon: 'user-tie',
    likes: 187,
    outfits: [
      { name: 'Blazer', icon: 'user-tie', color: '#2F4F4F' },
      { name: 'Pencil Skirt', icon: 'tshirt', color: '#34495E' },
      { name: 'Blouse', icon: 'tshirt', color: '#9B59B6' },
      { name: 'Heels', icon: 'shoe-prints', color: '#E74C3C' }
    ]
  },
  { 
    id: '3', 
    title: 'Evening Glamour',
    icon: 'glass-martini-alt',
    likes: 342,
    outfits: [
      { name: 'Cocktail Dress', icon: 'user', color: '#FF1493' },
      { name: 'Clutch', icon: 'shopping-bag', color: '#FFD700' },
      { name: 'Statement Jewelry', icon: 'gem', color: '#C0C0C0' },
      { name: 'Stilettos', icon: 'shoe-prints', color: '#000000' }
    ]
  },
];

const STYLE_CATEGORIES = [
  { id: '1', name: 'Casual', icon: 'tshirt' },
  { id: '2', name: 'Formal', icon: 'user-tie' },
  { id: '3', name: 'Party', icon: 'glass-cheers' },
  { id: '4', name: 'Seasonal', icon: 'cloud-sun' },
];

const FASHION_TIPS = [
  { id: '1', title: 'Color Matching Guide', type: 'Tips' },
  { id: '2', title: 'Accessorizing 101', type: 'Guide' },
  { id: '3', title: 'Sustainable Fashion', type: 'Blog' },
];

export default function StyleScreen() {
  const [isColorGuideVisible, setIsColorGuideVisible] = useState(false);
  const [isAccessoryGuideVisible, setIsAccessoryGuideVisible] = useState(false);
  const [isSustainableGuideVisible, setIsSustainableGuideVisible] = useState(false);

  // Update the Fashion Tips section
  const handleTipPress = (tipId: string) => {
    switch (tipId) {
      case '1':
        setIsColorGuideVisible(true);
        break;
      case '2':
        setIsAccessoryGuideVisible(true);
        break;
      case '3':
        setIsSustainableGuideVisible(true);
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Featured Outfit Inspirations */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="trending-up" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Trending Looks</ThemedText>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={TRENDING_OUTFITS}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.outfitCard}>
              <View style={styles.outfitHeader}>
                <FontAwesome5 name={item.icon} size={24} color="#FF4C94" />
                <ThemedText style={styles.outfitTitle}>{item.title}</ThemedText>
              </View>
              <View style={styles.outfitItems}>
                {item.outfits.map((outfit, index) => (
                  <View key={index} style={styles.outfitItem}>
                    <FontAwesome5 
                      name={outfit.icon} 
                      size={20} 
                      color={outfit.color} 
                    />
                    <ThemedText style={styles.outfitItemText}>{outfit.name}</ThemedText>
                  </View>
                ))}
              </View>
              <View style={styles.outfitFooter}>
                <View style={styles.likesContainer}>
                  <AntDesign name="heart" size={16} color="#FF4C94" />
                  <ThemedText style={styles.likesText}>{item.likes}</ThemedText>
                </View>
                <TouchableOpacity style={styles.tryButton}>
                  <ThemedText style={styles.tryButtonText}>Try This Look</ThemedText>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Style Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="category" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
        </View>
        <View style={styles.categoriesGrid}>
          {STYLE_CATEGORIES.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <FontAwesome5 name={category.icon} size={24} color="#FF4C94" />
              <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Virtual Try-On */}
      <TouchableOpacity style={styles.tryOnButton}>
        <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
        <ThemedText style={styles.tryOnText}>Virtual Try-On</ThemedText>
      </TouchableOpacity>

      {/* Outfit Customization */}
      <View style={styles.customizationCard}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="style" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Style My Outfit</ThemedText>
        </View>
        <TouchableOpacity style={styles.customizeButton}>
          <ThemedText style={styles.customizeButtonText}>Create New Look</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Fashion Tips & Blogs */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Fashion Tips</ThemedText>
        </View>
        {FASHION_TIPS.map((tip) => (
          <TouchableOpacity 
            key={tip.id} 
            style={styles.tipCard}
            onPress={() => handleTipPress(tip.id)}
          >
            <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
            <View style={styles.tipBadge}>
              <ThemedText style={styles.tipBadgeText}>{tip.type}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ColorMatchingGuide 
        visible={isColorGuideVisible}
        onClose={() => setIsColorGuideVisible(false)}
      />

      <AccessorizingGuide 
        visible={isAccessoryGuideVisible}
        onClose={() => setIsAccessoryGuideVisible(false)}
      />

      <SustainableFashionGuide 
        visible={isSustainableGuideVisible}
        onClose={() => setIsSustainableGuideVisible(false)}
      />

      {/* Community Section */}
      <View style={styles.communityCard}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="people" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>Style Community</ThemedText>
        </View>
        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name="share" size={20} color="#FFFFFF" />
          <ThemedText style={styles.shareButtonText}>Share Your Look</ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  section: {
    marginBottom: 24,
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
  outfitCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outfitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  outfitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 8,
  },
  outfitItems: {
    marginBottom: 16,
  },
  outfitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
  },
  outfitItemText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  outfitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    marginLeft: 4,
    color: '#666666',
  },
  tryButton: {
    backgroundColor: '#FF4C94',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
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
  categoryText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333333',
  },
  tryOnButton: {
    backgroundColor: '#FF4C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  tryOnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  customizationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  customizeButton: {
    backgroundColor: '#FF4C94',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  customizeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipTitle: {
    fontSize: 16,
    color: '#333333',
  },
  tipBadge: {
    backgroundColor: '#FFE8F1',
    padding: 6,
    borderRadius: 6,
  },
  tipBadgeText: {
    color: '#FF4C94',
    fontSize: 12,
    fontWeight: '600',
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shareButton: {
    backgroundColor: '#FF4C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});