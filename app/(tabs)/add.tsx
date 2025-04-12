import { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Platform, Modal, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import SwipeableTabContainer from '@/components/SwipeableTabContainer';
import { usePathname } from 'expo-router';

const OUTFIT_CATEGORIES = [
  { id: '1', name: 'Casual', icon: 'tshirt' },
  { id: '2', name: 'Formal', icon: 'user-tie' },
  { id: '3', name: 'Party', icon: 'glass-cheers' },
  { id: '4', name: 'Sports', icon: 'running' },
];

const ZODIAC_SIGNS = [
  { id: '1', name: 'Aries', color: '#FF4C94' },
  { id: '2', name: 'Taurus', color: '#4A90E2' },
  { id: '3', name: 'Gemini', color: '#9B59B6' },
];

const CASUAL_OUTFITS = [
  {
    id: 'c1',
    name: 'Classic White Tee & Jeans',
    icon: 'tshirt',
    color: '#3498DB',
    category: 'Men',
    items: ['White T-shirt', 'Blue Jeans', 'Sneakers']
  },
  {
    id: 'c2',
    name: 'Summer Dress Look',
    icon: 'user',
    color: '#E91E63',
    category: 'Women',
    items: ['Floral Sundress', 'Sandals', 'Straw Hat']
  },
  {
    id: 'c3',
    name: 'Athleisure Style',
    icon: 'running',
    color: '#2ECC71',
    category: 'Unisex',
    items: ['Sports Tee', 'Joggers', 'Athletic Shoes']
  },
  {
    id: 'c4',
    name: 'Boho Chic',
    icon: 'user',
    color: '#F1C40F',
    category: 'Women',
    items: ['Flowing Top', 'Maxi Skirt', 'Ankle Boots']
  },
  {
    id: 'c5',
    name: 'Smart Casual',
    icon: 'user-tie',
    color: '#34495E',
    category: 'Men',
    items: ['Polo Shirt', 'Chinos', 'Loafers']
  },
  {
    id: 'c6',
    name: 'Weekend Comfort',
    icon: 'tshirt',
    color: '#9B59B6',
    category: 'Women',
    items: ['Oversized Sweater', 'Leggings', 'Slip-ons']
  },
  {
    id: 'c7',
    name: 'Street Style',
    icon: 'tshirt',
    color: '#E74C3C',
    category: 'Men',
    items: ['Graphic Tee', 'Cargo Pants', 'High-tops']
  },
  {
    id: 'c8',
    name: 'Coffee Run',
    icon: 'user',
    color: '#1ABC9C',
    category: 'Women',
    items: ['Crop Top', 'High-waist Jeans', 'Sneakers']
  },
  {
    id: 'c9',
    name: 'Preppy Look',
    icon: 'user-tie',
    color: '#D35400',
    category: 'Men',
    items: ['Oxford Shirt', 'Khakis', 'Boat Shoes']
  },
  {
    id: 'c10',
    name: 'Casual Friday',
    icon: 'user',
    color: '#8E44AD',
    category: 'Women',
    items: ['Blazer', 'White Tee', 'Jeans']
  },
  {
    id: 'c11',
    name: 'Skater Style',
    icon: 'tshirt',
    color: '#2C3E50',
    category: 'Men',
    items: ['Hoodie', 'Loose Jeans', 'Skate Shoes']
  },
  {
    id: 'c12',
    name: 'Minimalist Chic',
    icon: 'user',
    color: '#7F8C8D',
    category: 'Women',
    items: ['Tank Top', 'Culottes', 'Mules']
  },
  {
    id: 'c13',
    name: 'Urban Explorer',
    icon: 'tshirt',
    color: '#16A085',
    category: 'Men',
    items: ['Denim Jacket', 'Black Tee', 'Boots']
  },
  {
    id: 'c14',
    name: 'Casual Glamour',
    icon: 'user',
    color: '#F39C12',
    category: 'Women',
    items: ['Statement Top', 'Skinny Jeans', 'Heeled Sandals']
  },
  {
    id: 'c15',
    name: 'Sporty Casual',
    icon: 'running',
    color: '#27AE60',
    category: 'Men',
    items: ['Track Jacket', 'Fitted Tee', 'Running Shoes']
  },
  {
    id: 'c16',
    name: 'Brunch Ready',
    icon: 'user',
    color: '#FF6B81',
    category: 'Women',
    items: ['Wrap Dress', 'Flats', 'Crossbody Bag']
  },
  {
    id: 'c17',
    name: 'Vintage Inspired',
    icon: 'tshirt',
    color: '#5758BB',
    category: 'Men',
    items: ['Band Tee', 'Ripped Jeans', 'Classic Sneakers']
  },
  {
    id: 'c18',
    name: 'Modern Basic',
    icon: 'user',
    color: '#26DE81',
    category: 'Women',
    items: ['Bodysuit', 'Mom Jeans', 'White Sneakers']
  },
  {
    id: 'c19',
    name: 'Laid-back Luxe',
    icon: 'tshirt',
    color: '#F7B731',
    category: 'Men',
    items: ['Linen Shirt', 'Bermuda Shorts', 'Espadrilles']
  },
  {
    id: 'c20',
    name: 'Easy Elegance',
    icon: 'user',
    color: '#786FA6',
    category: 'Women',
    items: ['Silk Blouse', 'Palazzo Pants', 'Ballet Flats']
  }
];

// Add this array after your CASUAL_OUTFITS array
const FORMAL_OUTFITS = [
  {
    id: 'f1',
    name: 'Classic Business Suit',
    icon: 'user-tie',
    color: '#2C3E50',
    category: 'Men',
    items: ['Navy Suit', 'White Dress Shirt', 'Oxford Shoes']
  },
  {
    id: 'f2',
    name: 'Corporate Power Dress',
    icon: 'user',
    color: '#E91E63',
    category: 'Women',
    items: ['Sheath Dress', 'Blazer', 'Pointed Heels']
  },
  {
    id: 'f3',
    name: 'Evening Black Tie',
    icon: 'user-tie',
    color: '#000000',
    category: 'Men',
    items: ['Tuxedo', 'Bow Tie', 'Patent Leather Shoes']
  },
  {
    id: 'f4',
    name: 'Cocktail Elegance',
    icon: 'user',
    color: '#9C27B0',
    category: 'Women',
    items: ['Cocktail Dress', 'Statement Jewelry', 'Stilettos']
  },
  {
    id: 'f5',
    name: 'Business Professional',
    icon: 'user-tie',
    color: '#34495E',
    category: 'Men',
    items: ['Pinstripe Suit', 'Blue Dress Shirt', 'Leather Belt']
  },
  {
    id: 'f6',
    name: 'Executive Style',
    icon: 'user',
    color: '#3498DB',
    category: 'Women',
    items: ['Pencil Skirt', 'Silk Blouse', 'Classic Pumps']
  },
  {
    id: 'f7',
    name: 'Modern Formal',
    icon: 'user-tie',
    color: '#1ABC9C',
    category: 'Men',
    items: ['Slim Fit Suit', 'Striped Tie', 'Brown Oxfords']
  },
  {
    id: 'f8',
    name: 'Formal Pantsuit',
    icon: 'user',
    color: '#8E44AD',
    category: 'Women',
    items: ['Tailored Pantsuit', 'Shell Top', 'Ankle Boots']
  },
  {
    id: 'f9',
    name: 'Wedding Guest',
    icon: 'user-tie',
    color: '#2980B9',
    category: 'Men',
    items: ['Gray Suit', 'Pocket Square', 'Dress Watch']
  },
  {
    id: 'f10',
    name: 'Gala Ready',
    icon: 'user',
    color: '#E74C3C',
    category: 'Women',
    items: ['Evening Gown', 'Clutch', 'Diamond Accessories']
  }
];

// Add this array after your FORMAL_OUTFITS array
const PARTY_OUTFITS = [
  {
    id: 'p1',
    name: 'Cocktail Party Chic',
    icon: 'glass-cheers',
    color: '#FF4C94',
    category: 'Women',
    items: ['Little Black Dress', 'Statement Heels', 'Clutch Purse']
  },
  {
    id: 'p2',
    name: 'Club Night',
    icon: 'glass-cheers',
    color: '#2196F3',
    category: 'Men',
    items: ['Designer T-shirt', 'Dark Jeans', 'Leather Sneakers']
  },
  {
    id: 'p3',
    name: 'Rooftop Party',
    icon: 'glass-cheers',
    color: '#E91E63',
    category: 'Women',
    items: ['Sequin Top', 'High-Waist Pants', 'Strappy Sandals']
  },
  {
    id: 'p4',
    name: 'Birthday Bash',
    icon: 'glass-cheers',
    color: '#9C27B0',
    category: 'Men',
    items: ['Printed Shirt', 'Slim Fit Chinos', 'Chelsea Boots']
  },
  {
    id: 'p5',
    name: 'House Party',
    icon: 'glass-cheers',
    color: '#00BCD4',
    category: 'Women',
    items: ['Crop Top', 'Mini Skirt', 'Platform Boots']
  },
  {
    id: 'p6',
    name: 'VIP Lounge',
    icon: 'glass-cheers',
    color: '#4CAF50',
    category: 'Men',
    items: ['Blazer', 'V-neck Tee', 'Designer Sneakers']
  },
  {
    id: 'p7',
    name: 'Beach Party',
    icon: 'glass-cheers',
    color: '#FF9800',
    category: 'Women',
    items: ['Maxi Dress', 'Wedge Sandals', 'Beach Tote']
  },
  {
    id: 'p8',
    name: 'New Years Eve',
    icon: 'glass-cheers',
    color: '#607D8B',
    category: 'Men',
    items: ['Velvet Blazer', 'Black Pants', 'Dress Shoes']
  },
  {
    id: 'p9',
    name: 'Garden Party',
    icon: 'glass-cheers',
    color: '#8BC34A',
    category: 'Women',
    items: ['Floral Dress', 'Sun Hat', 'Espadrilles']
  },
  {
    id: 'p10',
    name: 'Disco Night',
    icon: 'glass-cheers',
    color: '#FF5722',
    category: 'Men',
    items: ['Satin Shirt', 'Fitted Pants', 'Loafers']
  },
  {
    id: 'p11',
    name: 'Holiday Party',
    icon: 'glass-cheers',
    color: '#F44336',
    category: 'Women',
    items: ['Metallic Dress', 'Crystal Earrings', 'Stilettos']
  },
  {
    id: 'p12',
    name: 'Yacht Party',
    icon: 'glass-cheers',
    color: '#3F51B5',
    category: 'Men',
    items: ['Linen Shirt', 'White Pants', 'Boat Shoes']
  },
  {
    id: 'p13',
    name: 'Dinner Dance',
    icon: 'glass-cheers',
    color: '#9C27B0',
    category: 'Women',
    items: ['Wrap Dress', 'Dancing Shoes', 'Evening Bag']
  },
  {
    id: 'p14',
    name: 'Pool Party',
    icon: 'glass-cheers',
    color: '#03A9F4',
    category: 'Men',
    items: ['Hawaiian Shirt', 'Swim Shorts', 'Slides']
  }
];

// Add this array after your PARTY_OUTFITS array
const SPORTS_OUTFITS = [
  {
    id: 's1',
    name: 'Running Essential',
    icon: 'running',
    color: '#2196F3',
    category: 'Unisex',
    items: ['Moisture-wicking Tank', 'Running Shorts', 'Performance Sneakers']
  },
  {
    id: 's2',
    name: 'Yoga Flow',
    icon: 'pray',
    color: '#9C27B0',
    category: 'Women',
    items: ['Sports Bra', 'High-Waist Leggings', 'Grip Socks']
  },
  {
    id: 's3',
    name: 'Gym Power',
    icon: 'dumbbell',
    color: '#F44336',
    category: 'Men',
    items: ['Compression Shirt', 'Training Shorts', 'Lifting Shoes']
  },
  {
    id: 's4',
    name: 'Tennis Pro',
    icon: 'baseball-ball',
    color: '#4CAF50',
    category: 'Women',
    items: ['Tennis Dress', 'Visor', 'Court Shoes']
  },
  {
    id: 's5',
    name: 'Basketball Ready',
    icon: 'basketball-ball',
    color: '#FF9800',
    category: 'Men',
    items: ['Jersey', 'Basketball Shorts', 'High-Top Sneakers']
  },
  {
    id: 's6',
    name: 'Pilates Perfect',
    icon: 'pray',
    color: '#E91E63',
    category: 'Women',
    items: ['Cropped Tank', 'Capri Leggings', 'Light Trainers']
  },
  {
    id: 's7',
    name: 'Soccer Star',
    icon: 'futbol',
    color: '#00BCD4',
    category: 'Men',
    items: ['Soccer Jersey', 'Soccer Shorts', 'Cleats']
  },
  {
    id: 's8',
    name: 'Cycling Tour',
    icon: 'bicycle',
    color: '#795548',
    category: 'Unisex',
    items: ['Cycling Jersey', 'Padded Shorts', 'Clip-in Shoes']
  },
  {
    id: 's9',
    name: 'HIIT Training',
    icon: 'running',
    color: '#607D8B',
    category: 'Women',
    items: ['Performance Top', 'Training Tights', 'Cross-trainers']
  },
  {
    id: 's10',
    name: 'Swimming Laps',
    icon: 'swimmer',
    color: '#3F51B5',
    category: 'Men',
    items: ['Racing Swimsuit', 'Swim Cap', 'Goggles']
  },
  {
    id: 's11',
    name: 'CrossFit Beast',
    icon: 'dumbbell',
    color: '#FF5722',
    category: 'Unisex',
    items: ['Training Tee', 'Workout Shorts', 'Lifting Shoes']
  },
  {
    id: 's12',
    name: 'Track & Field',
    icon: 'running',
    color: '#009688',
    category: 'Women',
    items: ['Track Singlet', 'Sprint Shorts', 'Track Spikes']
  }
];

export default function AddItemScreen() {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isCasualModalVisible, setIsCasualModalVisible] = useState(false);
  const [isFormalModalVisible, setIsFormalModalVisible] = useState(false);
  const [isPartyModalVisible, setIsPartyModalVisible] = useState(false);
  const [isSportsModalVisible, setIsSportsModalVisible] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        alert('Sorry, we need camera and gallery permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SwipeableTabContainer currentRoute={pathname}>
      <ScrollView style={styles.container}>
        {/* Upload Section */}
        <View style={styles.section}>
          <View style={styles.uploadCard}>
            <MaterialIcons name="add-a-photo" size={40} color="#FF4C94" />
            <ThemedText style={styles.uploadText}>Upload Outfit Photo</ThemedText>
            <View style={styles.uploadButtons}>
              <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
                <MaterialIcons name="camera-alt" size={24} color="#FFFFFF" />
                <ThemedText style={styles.buttonText}>Take Photo</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <MaterialIcons name="photo-library" size={24} color="#FFFFFF" />
                <ThemedText style={styles.buttonText}>Choose From Gallery</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setImage(null)}
              >
                <MaterialIcons name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Outfit Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="style" size={24} color="#FF4C94" />
            <ThemedText style={styles.sectionTitle}>What to Wear Today?</ThemedText>
          </View>
          <View style={styles.categoryGrid}>
            {OUTFIT_CATEGORIES.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => {
                  setSelectedCategory(category.id);
                  if (category.id === '1') {
                    setIsCasualModalVisible(true);
                  } else if (category.id === '2') { // Formal category
                    setIsFormalModalVisible(true);
                  } else if (category.id === '3') { // Party category
                    setIsPartyModalVisible(true);
                  } else if (category.id === '4') { // Sports category
                    setIsSportsModalVisible(true);
                  }
                }}
              >
                <FontAwesome5 
                  name={category.icon} 
                  size={24} 
                  color={selectedCategory === category.id ? '#FFFFFF' : '#FF4C94'} 
                />
                <ThemedText style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weather-Based Suggestions */}
        <View style={styles.weatherCard}>
          <MaterialCommunityIcons name="weather-sunny" size={24} color="#FFB100" />
          <View style={styles.weatherInfo}>
            <ThemedText style={styles.weatherText}>Perfect for Sunny Weather</ThemedText>
            <ThemedText style={styles.suggestionText}>Try light, breathable fabrics</ThemedText>
          </View>
        </View>

        {/* Astrology Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="zodiac-leo" size={24} color="#FF4C94" />
            <ThemedText style={styles.sectionTitle}>Astro Style Guide</ThemedText>
          </View>
          <View style={styles.astrologyCard}>
            <ThemedText style={styles.luckyText}>Lucky Colors Today</ThemedText>
            <View style={styles.colorPalette}>
              {ZODIAC_SIGNS.map((sign) => (
                <View 
                  key={sign.id} 
                  style={[styles.colorCircle, { backgroundColor: sign.color }]} 
                />
              ))}
            </View>
          </View>
        </View>

        {/* Save & Share */}
        <View style={styles.section}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="favorite-border" size={24} color="#FFFFFF" />
              <ThemedText style={styles.actionButtonText}>Save Look</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="share" size={24} color="#FFFFFF" />
              <ThemedText style={styles.actionButtonText}>Share</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Community Poll */}
        <View style={styles.pollCard}>
          <ThemedText style={styles.pollTitle}>Get Community Feedback</ThemedText>
          <TouchableOpacity style={styles.pollButton}>
            <MaterialIcons name="poll" size={24} color="#FFFFFF" />
            <ThemedText style={styles.pollButtonText}>Create Poll</ThemedText>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCasualModalVisible}
          onRequestClose={() => setIsCasualModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Casual Outfits</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsCasualModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={CASUAL_OUTFITS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.outfitItem}>
                    <View style={styles.outfitIconContainer}>
                      <FontAwesome5 
                        name={item.icon} 
                        size={24} 
                        color={item.color}
                      />
                    </View>
                    <View style={styles.outfitInfo}>
                      <ThemedText style={styles.outfitName}>{item.name}</ThemedText>
                      <View style={[styles.categoryBadge, { 
                        backgroundColor: item.category === 'Women' ? '#FFE0F0' : 
                                      item.category === 'Men' ? '#E3F2FD' : '#F0F4C3'
                      }]}>
                        <ThemedText style={[styles.categoryBadgeText, {
                          color: item.category === 'Women' ? '#FF4C94' :
                                 item.category === 'Men' ? '#2196F3' : '#AFB42B'
                        }]}>
                          {item.category}
                        </ThemedText>
                      </View>
                      <View style={styles.itemsList}>
                        {item.items.map((piece, index) => (
                          <ThemedText key={index} style={styles.itemText}>
                            • {piece}
                          </ThemedText>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isFormalModalVisible}
          onRequestClose={() => setIsFormalModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Formal Outfits</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsFormalModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={FORMAL_OUTFITS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.outfitItem}>
                    <View style={styles.outfitIconContainer}>
                      <FontAwesome5 
                        name={item.icon} 
                        size={24} 
                        color={item.color}
                      />
                    </View>
                    <View style={styles.outfitInfo}>
                      <ThemedText style={styles.outfitName}>{item.name}</ThemedText>
                      <View style={[styles.categoryBadge, { 
                        backgroundColor: item.category === 'Women' ? '#FFE0F0' : '#E3F2FD'
                      }]}>
                        <ThemedText style={[styles.categoryBadgeText, {
                          color: item.category === 'Women' ? '#FF4C94' : '#2196F3'
                        }]}>
                          {item.category}
                        </ThemedText>
                      </View>
                      <View style={styles.itemsList}>
                        {item.items.map((piece, index) => (
                          <ThemedText key={index} style={styles.itemText}>
                            • {piece}
                          </ThemedText>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isPartyModalVisible}
          onRequestClose={() => setIsPartyModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Party Outfits</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsPartyModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={PARTY_OUTFITS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.outfitItem}>
                    <View style={styles.outfitIconContainer}>
                      <FontAwesome5 
                        name={item.icon} 
                        size={24} 
                        color={item.color}
                      />
                    </View>
                    <View style={styles.outfitInfo}>
                      <ThemedText style={styles.outfitName}>{item.name}</ThemedText>
                      <View style={[styles.categoryBadge, { 
                        backgroundColor: item.category === 'Women' ? '#FFE0F0' : '#E3F2FD'
                      }]}>
                        <ThemedText style={[styles.categoryBadgeText, {
                          color: item.category === 'Women' ? '#FF4C94' : '#2196F3'
                        }]}>
                          {item.category}
                        </ThemedText>
                      </View>
                      <View style={styles.itemsList}>
                        {item.items.map((piece, index) => (
                          <ThemedText key={index} style={styles.itemText}>
                            • {piece}
                          </ThemedText>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isSportsModalVisible}
          onRequestClose={() => setIsSportsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Sports Outfits</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsSportsModalVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={SPORTS_OUTFITS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.outfitItem}>
                    <View style={styles.outfitIconContainer}>
                      <FontAwesome5 
                        name={item.icon} 
                        size={24} 
                        color={item.color}
                      />
                    </View>
                    <View style={styles.outfitInfo}>
                      <ThemedText style={styles.outfitName}>{item.name}</ThemedText>
                      <View style={[styles.categoryBadge, { 
                        backgroundColor: item.category === 'Women' ? '#FFE0F0' : 
                                      item.category === 'Men' ? '#E3F2FD' : '#F0F4C3'
                      }]}>
                        <ThemedText style={[styles.categoryBadgeText, {
                          color: item.category === 'Women' ? '#FF4C94' :
                                 item.category === 'Men' ? '#2196F3' : '#AFB42B'
                        }]}>
                          {item.category}
                        </ThemedText>
                      </View>
                      <View style={styles.itemsList}>
                        {item.items.map((piece, index) => (
                          <ThemedText key={index} style={styles.itemText}>
                            • {piece}
                          </ThemedText>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SwipeableTabContainer>
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
  uploadCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 16,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadButton: {
    backgroundColor: '#FF4C94',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategory: {
    backgroundColor: '#FF4C94',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  weatherCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherInfo: {
    marginLeft: 12,
  },
  weatherText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  suggestionText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  astrologyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  luckyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  colorPalette: {
    flexDirection: 'row',
    gap: 12,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FF4C94',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  pollCard: {
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
  pollTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  pollButton: {
    backgroundColor: '#FF4C94',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  pollButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 20,
  },
  removeButton: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  outfitItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  outfitIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  outfitInfo: {
    flex: 1,
  },
  outfitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemsList: {
    marginTop: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  }
});