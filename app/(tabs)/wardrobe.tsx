import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Modal } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';

const CATEGORIES = [
  { id: '1', name: 'Tops', icon: 'tshirt' },
  { id: '2', name: 'Bottoms', icon: 'tshirt' },
  { id: '3', name: 'Dresses', icon: 'tshirt' },
  { id: '4', name: 'Shoes', icon: 'shoe-prints' },
  { id: '5', name: 'Accessories', icon: 'glasses' },
];

const CLOTHING_ITEMS = [
  { 
    id: '1', 
    category: 'Tops', 
    name: 'White T-Shirt', 
    timesWorn: 5,
    icon: 'tshirt',
    color: '#FF4C94'  // Pink
  },
  { 
    id: '2', 
    category: 'Tops', 
    name: 'Black Sweater', 
    timesWorn: 3,
    icon: 'user',
    color: '#4A90E2'  // Blue
  },
  { 
    id: '3', 
    category: 'Bottoms', 
    name: 'Blue Jeans', 
    timesWorn: 8,
    icon: 'tshirt',
    color: '#9B59B6'  // Purple
  },
  { 
    id: '4', 
    category: 'Shoes', 
    name: 'Sneakers', 
    timesWorn: 12,
    icon: 'shoe-prints',
    color: '#2ECC71'  // Green
  },
  { 
    id: '5', 
    category: 'Accessories', 
    name: 'Watch', 
    timesWorn: 15,
    icon: 'clock',
    color: '#F1C40F'  // Yellow
  },
  { 
    id: '6', 
    category: 'Accessories', 
    name: 'Sunglasses', 
    timesWorn: 4,
    icon: 'glasses',
    color: '#E67E22'  // Orange
  }
];

const SWEATER_TYPES = [
  { 
    id: 'sw1', 
    name: 'Crew Neck Sweater', 
    icon: 'tshirt',
    color: '#2C3E50',
    timesWorn: 3,
    material: 'Cotton Blend'
  },
  { 
    id: 'sw2', 
    name: 'V-Neck Sweater', 
    icon: 'tshirt',
    color: '#34495E',
    timesWorn: 2,
    material: 'Cashmere'
  },
  { 
    id: 'sw3', 
    name: 'Turtleneck Sweater', 
    icon: 'tshirt',
    color: '#7F8C8D',
    timesWorn: 4,
    material: 'Wool'
  },
  { 
    id: 'sw4', 
    name: 'Cardigan', 
    icon: 'tshirt',
    color: '#95A5A6',
    timesWorn: 5,
    material: 'Cotton'
  },
  { 
    id: 'sw5', 
    name: 'Cable Knit Sweater', 
    icon: 'tshirt',
    color: '#BDC3C7',
    timesWorn: 1,
    material: 'Merino Wool'
  },
  { 
    id: 'sw6', 
    name: 'Pullover Sweater', 
    icon: 'tshirt',
    color: '#1B2631',
    timesWorn: 6,
    material: 'Polyester Blend'
  },
  { 
    id: 'sw7', 
    name: 'Quarter-Zip Sweater', 
    icon: 'tshirt',
    color: '#2E4053',
    timesWorn: 2,
    material: 'Fleece'
  },
  { 
    id: 'sw8', 
    name: 'Mock Neck Sweater', 
    icon: 'tshirt',
    color: '#566573',
    timesWorn: 3,
    material: 'Acrylic'
  },
  { 
    id: 'sw9', 
    name: 'Sleeveless Sweater', 
    icon: 'tshirt',
    color: '#ABB2B9',
    timesWorn: 1,
    material: 'Cotton Blend'
  },
  { 
    id: 'sw10', 
    name: 'Oversized Sweater', 
    icon: 'tshirt',
    color: '#808B96',
    timesWorn: 4,
    material: 'Wool Blend'
  }
];

const TSHIRT_TYPES = [
  { 
    id: 'ts1', 
    name: 'Crew Neck T-Shirt', 
    icon: 'tshirt',
    color: '#E91E63',
    timesWorn: 5,
    material: 'Cotton'
  },
  { 
    id: 'ts2', 
    name: 'V-Neck T-Shirt', 
    icon: 'tshirt',
    color: '#9C27B0',
    timesWorn: 3,
    material: 'Cotton Blend'
  },
  { 
    id: 'ts3', 
    name: 'Graphic T-Shirt', 
    icon: 'tshirt',
    color: '#673AB7',
    timesWorn: 4,
    material: 'Cotton Jersey'
  },
  { 
    id: 'ts4', 
    name: 'Pocket T-Shirt', 
    icon: 'tshirt',
    color: '#3F51B5',
    timesWorn: 2,
    material: 'Organic Cotton'
  },
  { 
    id: 'ts5', 
    name: 'Henley T-Shirt', 
    icon: 'tshirt',
    color: '#2196F3',
    timesWorn: 6,
    material: 'Cotton Lycra'
  },
  { 
    id: 'ts6', 
    name: 'Long Sleeve T-Shirt', 
    icon: 'tshirt',
    color: '#03A9F4',
    timesWorn: 3,
    material: 'Cotton'
  },
  { 
    id: 'ts7', 
    name: 'Polo T-Shirt', 
    icon: 'tshirt',
    color: '#00BCD4',
    timesWorn: 4,
    material: 'Pique Cotton'
  },
  { 
    id: 'ts8', 
    name: 'Raglan T-Shirt', 
    icon: 'tshirt',
    color: '#009688',
    timesWorn: 2,
    material: 'Cotton Polyester'
  },
  { 
    id: 'ts9', 
    name: 'Scoop Neck T-Shirt', 
    icon: 'tshirt',
    color: '#4CAF50',
    timesWorn: 3,
    material: 'Modal Cotton'
  },
  { 
    id: 'ts10', 
    name: 'Muscle T-Shirt', 
    icon: 'tshirt',
    color: '#8BC34A',
    timesWorn: 5,
    material: 'Cotton Jersey'
  }
];

const JEANS_TYPES = [
  { 
    id: 'j1', 
    name: 'Slim Fit Jeans',
    icon: 'tshirt',
    color: '#1E88E5',
    timesWorn: 6,
    material: 'Stretch Denim'
  },
  { 
    id: 'j2', 
    name: 'Straight Leg Jeans',
    icon: 'tshirt',
    color: '#1976D2',
    timesWorn: 4,
    material: 'Raw Denim'
  },
  { 
    id: 'j3', 
    name: 'Skinny Jeans',
    icon: 'tshirt',
    color: '#1565C0',
    timesWorn: 8,
    material: 'Super Stretch Denim'
  },
  { 
    id: 'j4', 
    name: 'Bootcut Jeans',
    icon: 'tshirt',
    color: '#0D47A1',
    timesWorn: 3,
    material: 'Classic Denim'
  },
  { 
    id: 'j5', 
    name: 'Mom Jeans',
    icon: 'tshirt',
    color: '#42A5F5',
    timesWorn: 5,
    material: 'Rigid Denim'
  },
  { 
    id: 'j6', 
    name: 'Boyfriend Jeans',
    icon: 'tshirt',
    color: '#2196F3',
    timesWorn: 4,
    material: 'Vintage Denim'
  },
  { 
    id: 'j7', 
    name: 'Wide Leg Jeans',
    icon: 'tshirt',
    color: '#64B5F6',
    timesWorn: 2,
    material: 'Heavyweight Denim'
  },
  { 
    id: 'j8', 
    name: 'High-Rise Jeans',
    icon: 'tshirt',
    color: '#90CAF9',
    timesWorn: 7,
    material: 'Premium Denim'
  },
  { 
    id: 'j9', 
    name: 'Distressed Jeans',
    icon: 'tshirt',
    color: '#BBDEFB',
    timesWorn: 3,
    material: 'Washed Denim'
  },
  { 
    id: 'j10', 
    name: 'Cropped Jeans',
    icon: 'tshirt',
    color: '#E3F2FD',
    timesWorn: 4,
    material: 'Light Denim'
  }
];

const SNEAKER_TYPES = [
  { 
    id: 'sn1', 
    name: 'Running Sneakers',
    icon: 'shoe-prints',
    color: '#2ECC71',
    timesWorn: 12,
    material: 'Mesh'
  },
  { 
    id: 'sn2', 
    name: 'Classic White Sneakers',
    icon: 'shoe-prints',
    color: '#ECF0F1',
    timesWorn: 8,
    material: 'Leather'
  },
  { 
    id: 'sn3', 
    name: 'High-Top Sneakers',
    icon: 'shoe-prints',
    color: '#34495E',
    timesWorn: 5,
    material: 'Canvas'
  },
  { 
    id: 'sn4', 
    name: 'Slip-On Sneakers',
    icon: 'shoe-prints',
    color: '#95A5A6',
    timesWorn: 7,
    material: 'Canvas'
  },
  { 
    id: 'sn5', 
    name: 'Basketball Sneakers',
    icon: 'shoe-prints',
    color: '#E74C3C',
    timesWorn: 4,
    material: 'Synthetic'
  },
  { 
    id: 'sn6', 
    name: 'Retro Sneakers',
    icon: 'shoe-prints',
    color: '#F1C40F',
    timesWorn: 6,
    material: 'Suede'
  },
  { 
    id: 'sn7', 
    name: 'Platform Sneakers',
    icon: 'shoe-prints',
    color: '#9B59B6',
    timesWorn: 3,
    material: 'Mixed'
  },
  { 
    id: 'sn8', 
    name: 'Training Sneakers',
    icon: 'shoe-prints',
    color: '#3498DB',
    timesWorn: 9,
    material: 'Mesh'
  },
  { 
    id: 'sn9', 
    name: 'Knit Sneakers',
    icon: 'shoe-prints',
    color: '#1ABC9C',
    timesWorn: 4,
    material: 'Knit'
  },
  { 
    id: 'sn10', 
    name: 'Lifestyle Sneakers',
    icon: 'shoe-prints',
    color: '#D35400',
    timesWorn: 5,
    material: 'Mixed'
  }
];

const WATCH_TYPES = [
  { 
    id: 'w1', 
    name: 'Classic Analog Watch',
    icon: 'clock',
    color: '#DAA520',
    timesWorn: 15,
    material: 'Stainless Steel'
  },
  { 
    id: 'w2', 
    name: 'Smart Watch',
    icon: 'clock',
    color: '#000000',
    timesWorn: 20,
    material: 'Aluminum'
  },
  { 
    id: 'w3', 
    name: 'Chronograph Watch',
    icon: 'clock',
    color: '#C0C0C0',
    timesWorn: 8,
    material: 'Titanium'
  },
  { 
    id: 'w4', 
    name: 'Dress Watch',
    icon: 'clock',
    color: '#FFD700',
    timesWorn: 5,
    material: 'Gold Plated'
  },
  { 
    id: 'w5', 
    name: 'Digital Watch',
    icon: 'clock',
    color: '#4682B4',
    timesWorn: 12,
    material: 'Resin'
  },
  { 
    id: 'w6', 
    name: 'Dive Watch',
    icon: 'clock',
    color: '#00008B',
    timesWorn: 6,
    material: 'Ceramic'
  },
  { 
    id: 'w7', 
    name: 'Minimalist Watch',
    icon: 'clock',
    color: '#808080',
    timesWorn: 10,
    material: 'Leather'
  },
  { 
    id: 'w8', 
    name: 'Luxury Watch',
    icon: 'clock',
    color: '#B8860B',
    timesWorn: 3,
    material: '18K Gold'
  },
  { 
    id: 'w9', 
    name: 'Sport Watch',
    icon: 'clock',
    color: '#FF4500',
    timesWorn: 18,
    material: 'Silicone'
  },
  { 
    id: 'w10', 
    name: 'Fitness Tracker',
    icon: 'clock',
    color: '#32CD32',
    timesWorn: 25,
    material: 'TPU'
  }
];

const SUNGLASSES_TYPES = [
  { 
    id: 'sg1', 
    name: 'Aviator Sunglasses',
    icon: 'glasses',
    color: '#2C3E50',
    timesWorn: 8,
    material: 'Metal Frame'
  },
  { 
    id: 'sg2', 
    name: 'Wayfarer Sunglasses',
    icon: 'glasses',
    color: '#34495E',
    timesWorn: 12,
    material: 'Acetate'
  },
  { 
    id: 'sg3', 
    name: 'Cat Eye Sunglasses',
    icon: 'glasses',
    color: '#E91E63',
    timesWorn: 5,
    material: 'Plastic'
  },
  { 
    id: 'sg4', 
    name: 'Round Sunglasses',
    icon: 'glasses',
    color: '#9C27B0',
    timesWorn: 3,
    material: 'Metal & Acetate'
  },
  { 
    id: 'sg5', 
    name: 'Sport Sunglasses',
    icon: 'glasses',
    color: '#2196F3',
    timesWorn: 15,
    material: 'Polycarbonate'
  },
  { 
    id: 'sg6', 
    name: 'Oversized Sunglasses',
    icon: 'glasses',
    color: '#FF9800',
    timesWorn: 6,
    material: 'Premium Acetate'
  },
  { 
    id: 'sg7', 
    name: 'Clubmaster Sunglasses',
    icon: 'glasses',
    color: '#795548',
    timesWorn: 4,
    material: 'Metal & Plastic'
  },
  { 
    id: 'sg8', 
    name: 'Polarized Sunglasses',
    icon: 'glasses',
    color: '#607D8B',
    timesWorn: 10,
    material: 'High-Grade Plastic'
  },
  { 
    id: 'sg9', 
    name: 'Designer Sunglasses',
    icon: 'glasses',
    color: '#FFC107',
    timesWorn: 2,
    material: 'Premium Material'
  },
  { 
    id: 'sg10', 
    name: 'Retro Sunglasses',
    icon: 'glasses',
    color: '#FF5722',
    timesWorn: 7,
    material: 'Vintage Acetate'
  }
];

const TOP_TYPES = [
  { 
    id: 'top1', 
    name: 'Classic Button-Down Shirt',
    icon: 'tshirt',
    color: '#3498DB',
    timesWorn: 8,
    material: 'Cotton Poplin'
  },
  { 
    id: 'top2', 
    name: 'Silk Blouse',
    icon: 'tshirt',
    color: '#E74C3C',
    timesWorn: 5,
    material: 'Silk'
  },
  { 
    id: 'top3', 
    name: 'Casual Tank Top',
    icon: 'tshirt',
    color: '#2ECC71',
    timesWorn: 12,
    material: 'Cotton Jersey'
  },
  { 
    id: 'top4', 
    name: 'Off-Shoulder Top',
    icon: 'tshirt',
    color: '#9B59B6',
    timesWorn: 4,
    material: 'Modal Blend'
  },
  { 
    id: 'top5', 
    name: 'Wrap Top',
    icon: 'tshirt',
    color: '#F1C40F',
    timesWorn: 6,
    material: 'Rayon'
  },
  { 
    id: 'top6', 
    name: 'Crop Top',
    icon: 'tshirt',
    color: '#E91E63',
    timesWorn: 9,
    material: 'Cotton Spandex'
  },
  { 
    id: 'top7', 
    name: 'Peplum Top',
    icon: 'tshirt',
    color: '#00BCD4',
    timesWorn: 3,
    material: 'Polyester'
  },
  { 
    id: 'top8', 
    name: 'Halter Top',
    icon: 'tshirt',
    color: '#FF5722',
    timesWorn: 7,
    material: 'Chiffon'
  },
  { 
    id: 'top9', 
    name: 'Turtleneck Top',
    icon: 'tshirt',
    color: '#795548',
    timesWorn: 5,
    material: 'Ribbed Knit'
  },
  { 
    id: 'top10', 
    name: 'Peasant Blouse',
    icon: 'tshirt',
    color: '#009688',
    timesWorn: 4,
    material: 'Cotton Voile'
  }
];

const BOTTOM_TYPES = [
  { 
    id: 'b1', 
    name: 'A-Line Skirt',
    icon: 'tshirt',
    color: '#3498DB',
    timesWorn: 7,
    material: 'Cotton Blend'
  },
  { 
    id: 'b2', 
    name: 'Pleated Skirt',
    icon: 'tshirt',
    color: '#E74C3C',
    timesWorn: 4,
    material: 'Polyester'
  },
  { 
    id: 'b3', 
    name: 'Palazzo Pants',
    icon: 'tshirt',
    color: '#2ECC71',
    timesWorn: 9,
    material: 'Rayon'
  },
  { 
    id: 'b4', 
    name: 'Cigarette Pants',
    icon: 'tshirt',
    color: '#9B59B6',
    timesWorn: 6,
    material: 'Cotton Stretch'
  },
  { 
    id: 'b5', 
    name: 'Pencil Skirt',
    icon: 'tshirt',
    color: '#F1C40F',
    timesWorn: 5,
    material: 'Wool Blend'
  },
  { 
    id: 'b6', 
    name: 'Culottes',
    icon: 'tshirt',
    color: '#E91E63',
    timesWorn: 3,
    material: 'Linen'
  },
  { 
    id: 'b7', 
    name: 'Cargo Pants',
    icon: 'tshirt',
    color: '#00BCD4',
    timesWorn: 8,
    material: 'Cotton Canvas'
  },
  { 
    id: 'b8', 
    name: 'Midi Skirt',
    icon: 'tshirt',
    color: '#FF5722',
    timesWorn: 4,
    material: 'Chiffon'
  },
  { 
    id: 'b9', 
    name: 'Wide-Leg Trousers',
    icon: 'tshirt',
    color: '#795548',
    timesWorn: 6,
    material: 'Linen Blend'
  },
  { 
    id: 'b10', 
    name: 'Tailored Shorts',
    icon: 'tshirt',
    color: '#009688',
    timesWorn: 5,
    material: 'Cotton Twill'
  }
];

const DRESS_TYPES = [
  { 
    id: 'd1',
    name: 'A-Line Evening Dress',
    icon: 'user',
    color: '#E91E63',
    timesWorn: 3,
    material: 'Silk Chiffon',
    category: 'Women'
  },
  { 
    id: 'd2',
    name: 'Fitted Suit Dress',
    icon: 'user-tie',
    color: '#2196F3',
    timesWorn: 5,
    material: 'Wool Blend',
    category: 'Men'
  },
  { 
    id: 'd3',
    name: 'Summer Maxi Dress',
    icon: 'user',
    color: '#4CAF50',
    timesWorn: 8,
    material: 'Cotton Voile',
    category: 'Women'
  },
  { 
    id: 'd4',
    name: 'Tuxedo Dress Suit',
    icon: 'user-tie',
    color: '#000000',
    timesWorn: 2,
    material: 'Satin',
    category: 'Men'
  },
  { 
    id: 'd5',
    name: 'Wrap Midi Dress',
    icon: 'user',
    color: '#9C27B0',
    timesWorn: 6,
    material: 'Jersey',
    category: 'Women'
  },
  { 
    id: 'd6',
    name: 'Slim Fit Dress Suit',
    icon: 'user-tie',
    color: '#607D8B',
    timesWorn: 4,
    material: 'Italian Wool',
    category: 'Men'
  },
  { 
    id: 'd7',
    name: 'Cocktail Dress',
    icon: 'user',
    color: '#F44336',
    timesWorn: 3,
    material: 'Sequin',
    category: 'Women'
  },
  { 
    id: 'd8',
    name: 'Double Breasted Suit',
    icon: 'user-tie',
    color: '#3F51B5',
    timesWorn: 2,
    material: 'Cashmere Blend',
    category: 'Men'
  },
  { 
    id: 'd9',
    name: 'Bodycon Dress',
    icon: 'user',
    color: '#FF5722',
    timesWorn: 4,
    material: 'Stretch Knit',
    category: 'Women'
  },
  { 
    id: 'd10',
    name: 'Three-Piece Suit',
    icon: 'user-tie',
    color: '#795548',
    timesWorn: 1,
    material: 'Pinstripe Wool',
    category: 'Men'
  },
  { 
    id: 'd11',
    name: 'Floral Sundress',
    icon: 'user',
    color: '#FF9800',
    timesWorn: 7,
    material: 'Rayon',
    category: 'Women'
  },
  { 
    id: 'd12',
    name: 'Linen Summer Suit',
    icon: 'user-tie',
    color: '#8BC34A',
    timesWorn: 3,
    material: 'Linen',
    category: 'Men'
  },
  { 
    id: 'd13',
    name: 'Pleated Gown',
    icon: 'user',
    color: '#673AB7',
    timesWorn: 1,
    material: 'Tulle',
    category: 'Women'
  },
  { 
    id: 'd14',
    name: 'Velvet Dinner Jacket',
    icon: 'user-tie',
    color: '#009688',
    timesWorn: 2,
    material: 'Velvet',
    category: 'Men'
  },
  { 
    id: 'd15',
    name: 'Slip Dress',
    icon: 'user',
    color: '#FFC107',
    timesWorn: 5,
    material: 'Satin',
    category: 'Women'
  },
  { 
    id: 'd16',
    name: 'Classic Black Suit',
    icon: 'user-tie',
    color: '#212121',
    timesWorn: 6,
    material: 'Wool',
    category: 'Men'
  },
  { 
    id: 'd17',
    name: 'Off-Shoulder Dress',
    icon: 'user',
    color: '#00BCD4',
    timesWorn: 3,
    material: 'Crepe',
    category: 'Women'
  },
  { 
    id: 'd18',
    name: 'White Dinner Jacket',
    icon: 'user-tie',
    color: '#FFFFFF',
    timesWorn: 1,
    material: 'Cotton Blend',
    category: 'Men'
  },
  { 
    id: 'd19',
    name: 'Halter Neck Dress',
    icon: 'user',
    color: '#E040FB',
    timesWorn: 4,
    material: 'Silk',
    category: 'Women'
  },
  { 
    id: 'd20',
    name: 'Modern Fit Suit',
    icon: 'user-tie',
    color: '#455A64',
    timesWorn: 5,
    material: 'Merino Wool',
    category: 'Men'
  }
];

export default function WardrobeScreen() {
  const [isSweaterModalVisible, setIsSweaterModalVisible] = useState(false);
  const [isTshirtModalVisible, setIsTshirtModalVisible] = useState(false);
  const [isJeansModalVisible, setIsJeansModalVisible] = useState(false);
  const [isSneakerModalVisible, setIsSneakerModalVisible] = useState(false);
  const [isWatchModalVisible, setIsWatchModalVisible] = useState(false);
  const [isSunglassesModalVisible, setIsSunglassesModalVisible] = useState(false);
  const [isTopModalVisible, setIsTopModalVisible] = useState(false);
  const [isBottomModalVisible, setIsBottomModalVisible] = useState(false);
  const [isDressModalVisible, setIsDressModalVisible] = useState(false);

  const handleSweaterClick = () => {
    setIsSweaterModalVisible(true);
  };

  const handleTshirtClick = () => {
    setIsTshirtModalVisible(true);
  };

  const handleJeansClick = () => {
    setIsJeansModalVisible(true);
  };

  const handleSneakerClick = () => {
    setIsSneakerModalVisible(true);
  };

  const handleWatchClick = () => {
    setIsWatchModalVisible(true);
  };

  const handleSunglassesClick = () => {
    setIsSunglassesModalVisible(true);
  };

  const handleTopClick = () => {
    setIsTopModalVisible(true);
  };

  const handleBottomClick = () => {
    setIsBottomModalVisible(true);
  };

  const handleDressClick = () => {
    setIsDressModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Add Item Button */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>My Wardrobe</ThemedText>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add-circle" size={28} color="#FF4C94" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        style={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={
              item.id === '1' ? handleTopClick : 
              item.id === '2' ? handleBottomClick : 
              item.id === '3' ? handleDressClick :
              undefined
            }
          >
            <FontAwesome5 name={item.icon} size={24} color="#FF4C94" />
            <ThemedText style={styles.categoryText}>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />

      {/* AI Suggestions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="auto-awesome" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>AI Suggestions</ThemedText>
        </View>
        <View style={styles.suggestionCard}>
          <ThemedText style={styles.suggestionText}>
            Try mixing your white t-shirt with blue jeans for a casual look
          </ThemedText>
        </View>
      </View>

      {/* Sustainability Stats */}
      <View style={styles.sustainabilityCard}>
        <Ionicons name="leaf" size={24} color="#4CAF50" />
        <View style={styles.sustainabilityInfo}>
          <ThemedText style={styles.sustainabilityTitle}>Sustainability Score</ThemedText>
          <ThemedText style={styles.sustainabilityText}>
            You've reworn items 16 times this month! 🌱
          </ThemedText>
        </View>
      </View>

      {/* Clothing Items Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="grid-view" size={24} color="#FF4C94" />
          <ThemedText style={styles.sectionTitle}>All Items</ThemedText>
        </View>
        <View style={styles.clothingGrid}>
          {CLOTHING_ITEMS.map((item) => (
            item.id === '2' ? (
              <TouchableOpacity 
                key="2" 
                style={styles.clothingItem}
                onPress={handleSweaterClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="user" 
                    size={32} 
                    color="#4A90E2"
                  />
                </View>
                <ThemedText style={styles.itemName}>Black Sweater</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 3x</ThemedText>
              </TouchableOpacity>
            ) : item.id === '1' ? (
              <TouchableOpacity 
                key="1" 
                style={styles.clothingItem}
                onPress={handleTshirtClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="tshirt" 
                    size={32} 
                    color="#FF4C94"
                  />
                </View>
                <ThemedText style={styles.itemName}>White T-Shirt</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 5x</ThemedText>
              </TouchableOpacity>
            ) : item.id === '3' ? (
              <TouchableOpacity 
                key="3" 
                style={styles.clothingItem}
                onPress={handleJeansClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="tshirt" 
                    size={32} 
                    color="#9B59B6"
                  />
                </View>
                <ThemedText style={styles.itemName}>Blue Jeans</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 8x</ThemedText>
              </TouchableOpacity>
            ) : item.id === '4' ? (
              <TouchableOpacity 
                key="4" 
                style={styles.clothingItem}
                onPress={handleSneakerClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="shoe-prints" 
                    size={32} 
                    color="#2ECC71"
                  />
                </View>
                <ThemedText style={styles.itemName}>Sneakers</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 12x</ThemedText>
              </TouchableOpacity>
            ) : item.id === '5' ? (
              <TouchableOpacity 
                key="5" 
                style={styles.clothingItem}
                onPress={handleWatchClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="clock" 
                    size={32} 
                    color="#F1C40F"
                  />
                </View>
                <ThemedText style={styles.itemName}>Watch</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 15x</ThemedText>
              </TouchableOpacity>
            ) : item.id === '6' ? (
              <TouchableOpacity 
                key="6" 
                style={styles.clothingItem}
                onPress={handleSunglassesClick}
              >
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name="glasses" 
                    size={32} 
                    color="#E67E22"
                  />
                </View>
                <ThemedText style={styles.itemName}>Sunglasses</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: 4x</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={item.id} style={styles.clothingItem}>
                <View style={styles.itemIconContainer}>
                  <FontAwesome5 
                    name={item.icon} 
                    size={32} 
                    color={item.color}
                  />
                </View>
                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                <ThemedText style={styles.itemStats}>Worn: {item.timesWorn}x</ThemedText>
              </TouchableOpacity>
            )
          ))}
        </View>
      </View>

      {/* Sweater Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSweaterModalVisible}
        onRequestClose={() => setIsSweaterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Sweater Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsSweaterModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SWEATER_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* T-Shirt Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTshirtModalVisible}
        onRequestClose={() => setIsTshirtModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>T-Shirt Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsTshirtModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={TSHIRT_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Jeans Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isJeansModalVisible}
        onRequestClose={() => setIsJeansModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Jeans Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsJeansModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={JEANS_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Sneaker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSneakerModalVisible}
        onRequestClose={() => setIsSneakerModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Sneaker Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsSneakerModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SNEAKER_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Watch Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isWatchModalVisible}
        onRequestClose={() => setIsWatchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Watch Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsWatchModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={WATCH_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Sunglasses Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSunglassesModalVisible}
        onRequestClose={() => setIsSunglassesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Sunglasses Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsSunglassesModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={SUNGLASSES_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Top Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTopModalVisible}
        onRequestClose={() => setIsTopModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Tops Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsTopModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={TOP_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Bottom Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomModalVisible}
        onRequestClose={() => setIsBottomModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Bottoms Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsBottomModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={BOTTOM_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.sweaterItem}>
                  <View style={styles.sweaterIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.sweaterInfo}>
                    <ThemedText style={styles.sweaterName}>{item.name}</ThemedText>
                    <ThemedText style={styles.sweaterMaterial}>{item.material}</ThemedText>
                    <ThemedText style={styles.sweaterStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Dress Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDressModalVisible}
        onRequestClose={() => setIsDressModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Dress Collection</ThemedText>
              <TouchableOpacity 
                onPress={() => setIsDressModalVisible(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#333333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={DRESS_TYPES}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dressItem}>
                  <View style={styles.dressIconContainer}>
                    <FontAwesome5 
                      name={item.icon} 
                      size={24} 
                      color={item.color}
                    />
                  </View>
                  <View style={styles.dressInfo}>
                    <ThemedText style={styles.dressName}>{item.name}</ThemedText>
                    <View style={styles.dressDetails}>
                      <ThemedText style={styles.dressMaterial}>{item.material}</ThemedText>
                      <View style={[styles.categoryBadge, { backgroundColor: item.category === 'Women' ? '#FFE0F0' : '#E3F2FD' }]}> 
                        <ThemedText style={[styles.categoryBadgeText, { color: item.category === 'Women' ? '#FF4C94' : '#2196F3' }]}>
                          {item.category}
                        </ThemedText>
                      </View>
                    </View>
                    <ThemedText style={styles.dressStats}>
                      Worn: {item.timesWorn}x
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  addButton: {
    padding: 4,
  },
  categoriesList: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: 100,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333333',
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  suggestionText: {
    fontSize: 16,
    color: '#666666',
  },
  sustainabilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sustainabilityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  sustainabilityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  sustainabilityText: {
    fontSize: 14,
    color: '#388E3C',
    marginTop: 4,
  },
  clothingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  clothingItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  itemIconContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemStats: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
  sweaterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sweaterIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sweaterInfo: {
    flex: 1,
  },
  sweaterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  sweaterMaterial: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  sweaterStats: {
    fontSize: 12,
    color: '#999999',
  },
  dressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dressIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dressInfo: {
    flex: 1,
  },
  dressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dressDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  dressMaterial: {
    fontSize: 14,
    color: '#666666',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dressStats: {
    fontSize: 12,
    color: '#999999',
  },
});