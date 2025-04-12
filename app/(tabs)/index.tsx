import { StyleSheet, View, ScrollView, Modal, TouchableOpacity, FlatList, Platform } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeableTabContainer from '@/components/SwipeableTabContainer';
import { usePathname } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import SpringFashionGuide from '@/components/SpringFashionGuide';

// Add this array for clothing icons
const TRENDING_ITEMS = [
  { id: '1', name: 'T-Shirt', icon: 'tshirt', color: '#FF4C94' },
  { id: '2', name: 'Jeans', icon: 'tshirt', color: '#4A90E2' },
  { id: '3', name: 'Dress', icon: 'user-tie', color: '#9B59B6' },
  { id: '4', name: 'Shoes', icon: 'shoe-prints', color: '#E67E22' },
  { id: '5', name: 'Hat', icon: 'hat-cowboy', color: '#E74C3C' },
  { id: '6', name: 'Sunglasses', icon: 'glasses', color: '#34495E' },
  { id: '7', name: 'Watch', icon: 'clock', color: '#2ECC71' },
  { id: '8', name: 'Bag', icon: 'shopping-bag', color: '#F1C40F' },
  { id: '9', name: 'Scarf', icon: 'archive', color: '#1ABC9C' },
  { id: '10', name: 'Belt', icon: 'band-aid', color: '#8E44AD' },
  { id: '11', name: 'Jacket', icon: 'user', color: '#3498DB' },
  { id: '12', name: 'Skirt', icon: 'tshirt', color: '#E91E63' },
  { id: '13', name: 'Sweater', icon: 'user', color: '#009688' },
  { id: '14', name: 'Boots', icon: 'shoe-prints', color: '#795548' },
  { id: '15', name: 'Necklace', icon: 'link', color: '#FFD700' },
  { id: '16', name: 'Ring', icon: 'circle', color: '#C0C0C0' },
  { id: '17', name: 'Earrings', icon: 'dot-circle', color: '#FFA500' },
  { id: '18', name: 'Blazer', icon: 'user-tie', color: '#2F4F4F' },
  { id: '19', name: 'Shorts', icon: 'tshirt', color: '#00CED1' },
  { id: '20', name: 'Socks', icon: 'socks', color: '#FF69B4' },
];

// Add this array at the top of your file after the imports
const WARDROBE_ITEMS = [
  { id: '1', icon: 'tshirt', color: '#FF4C94', category: 'Tops' },
  { id: '2', icon: 'shoe-prints', color: '#4A90E2', category: 'Shoes' },
  { id: '3', icon: 'hat-cowboy', color: '#9B59B6', category: 'Accessories' },
];

// Add this array after your existing TRENDING_ITEMS array
const SPRING_OUTFITS = [
  {
    id: '1',
    title: 'Casual Brunch',
    items: [
      { name: 'White Blouse', icon: 'tshirt', color: '#FFFFFF' },
      { name: 'Floral Skirt', icon: 'user', color: '#FF93B8' },
      { name: 'Beige Sandals', icon: 'shoe-prints', color: '#DEB887' }
    ]
  },
  {
    id: '2',
    title: 'Weekend Shopping',
    items: [
      { name: 'Denim Jacket', icon: 'user', color: '#4A90E2' },
      { name: 'White T-shirt', icon: 'tshirt', color: '#FFFFFF' },
      { name: 'Mom Jeans', icon: 'user', color: '#87CEEB' }
    ]
  },
  {
    id: '3',
    title: 'Park Picnic',
    items: [
      { name: 'Floral Dress', icon: 'user', color: '#98FB98' },
      { name: 'Straw Hat', icon: 'hat-cowboy', color: '#DEB887' },
      { name: 'Canvas Sneakers', icon: 'shoe-prints', color: '#FFFFFF' }
    ]
  },
  // Add more outfit combinations...
];

type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

interface ScheduledEvent {
  day: WeekDay;
  time: Date;
}

export default function HomeScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isTrendingVisible, setIsTrendingVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOutfits, setSelectedOutfits] = useState<string[]>([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<WeekDay>('Sat');
  const [savedEvents, setSavedEvents] = useState<ScheduledEvent[]>([]);
  const [isSpringFashionVisible, setIsSpringFashionVisible] = useState(false);

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    setIsCalendarVisible(false);
  };

  const WEEKDAYS: WeekDay[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const saveEventTime = () => {
    const newEvent: ScheduledEvent = {
      day: selectedDay,
      time: selectedTime
    };
    setSavedEvents([...savedEvents, newEvent]);
  };

  const removeEvent = (index: number) => {
    setSavedEvents(savedEvents.filter((_, i) => i !== index));
  };

  // Add these scroll event handlers
  const handleScrollBegin = () => {
    if (isScrollingShared?.value !== undefined) {
      isScrollingShared.value = true;
    }
  };

  const handleScrollEnd = () => {
    if (isScrollingShared?.value !== undefined) {
      isScrollingShared.value = false;
    }
  };

  return (
    <SwipeableTabContainer currentRoute={pathname}>
      <ScrollView style={styles.container}>
        {/* Weather Widget */}
        <View style={styles.weatherWidget}>
          <MaterialIcons name="wb-sunny" size={32} color="#FFB100" />
          <View style={styles.weatherInfo}>
            <ThemedText style={styles.temperature}>28°C</ThemedText>
            <ThemedText style={styles.weatherText}>Sunny</ThemedText>
          </View>
        </View>

        {/* Personalized Outfit Suggestions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="style" size={24} color="#FF4C94" />
            <ThemedText style={styles.sectionTitle}>Today's Picks</ThemedText>
          </View>
          <View style={styles.outfitCard}>
            <ThemedText style={styles.outfitText}>Perfect for today's weather</ThemedText>
          </View>
        </View>

        {/* Quick Access Wardrobe */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => router.push('/(tabs)/wardrobe')}
          >
            <MaterialIcons name="grid-view" size={24} color="#FF4C94" />
            <ThemedText style={styles.sectionTitle}>Your Wardrobe</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.wardrobeGrid}
            onPress={() => router.push('/(tabs)/wardrobe')}
          >
            {WARDROBE_ITEMS.map((item) => (
              <View key={item.id} style={styles.wardrobeItem}>
                <FontAwesome5 
                  name={item.icon} 
                  size={32} 
                  color={item.color}
                  style={styles.wardrobeIcon}
                />
                <ThemedText style={styles.wardrobeCategory}>{item.category}</ThemedText>
              </View>
            ))}
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity 
              style={styles.calendarButton}
              onPress={() => setIsCalendarVisible(true)}
            >
              <Ionicons name="calendar" size={24} color="#FF4C94" />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
          </View>
          <View style={styles.eventCard}>
            <ThemedText style={styles.eventTitle}>Weekend Party</ThemedText>
            
            {/* Day Selector */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.daySelector}
              onScrollBeginDrag={handleScrollBegin}
              onScrollEndDrag={handleScrollEnd}
              onMomentumScrollBegin={handleScrollBegin}
              onMomentumScrollEnd={handleScrollEnd}
              scrollEventThrottle={16}
            >
              {WEEKDAYS.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.selectedDayButton
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <ThemedText style={[
                    styles.dayButtonText,
                    selectedDay === day && styles.selectedDayText
                  ]}>
                    {day}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Time Selector */}
            <TouchableOpacity
              style={styles.timeSelector}
              onPress={() => setShowTimePicker(true)}
            >
              <MaterialIcons name="access-time" size={24} color="#FF4C94" />
              <ThemedText style={styles.timeText}>
                {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </ThemedText>
            </TouchableOpacity>

            {/* Save Button */}
            <TouchableOpacity 
              style={styles.saveEventButton}
              onPress={saveEventTime}
            >
              <MaterialIcons name="add" size={24} color="#FFFFFF" />
              <ThemedText style={styles.saveEventButtonText}>
                Add Time Slot
              </ThemedText>
            </TouchableOpacity>

            {/* Saved Events List */}
            {savedEvents.map((event, index) => (
              <View key={index} style={styles.savedEventItem}>
                <View style={styles.savedEventInfo}>
                  <ThemedText style={styles.savedEventDay}>{event.day}</ThemedText>
                  <ThemedText style={styles.savedEventTime}>
                    {event.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </ThemedText>
                </View>
                <TouchableOpacity 
                  style={styles.removeEventButton}
                  onPress={() => removeEvent(index)}
                >
                  <MaterialIcons name="close" size={20} color="#FF4C94" />
                </TouchableOpacity>
              </View>
            ))}

            {/* Time Picker Modal (Android) */}
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>

        {/* Calendar Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setIsCalendarVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <ThemedText style={styles.calendarTitle}>Select Event Date</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsCalendarVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#FF4C94' }
                }}
                theme={{
                  todayTextColor: '#FF4C94',
                  selectedDayBackgroundColor: '#FF4C94',
                  arrowColor: '#FF4C94',
                  dotColor: '#FF4C94',
                  textDayFontWeight: '500',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '500',
                }}
              />
            </View>
          </View>
        </Modal>

        {/* Trending Styles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity 
              onPress={() => setIsSpringFashionVisible(true)}
              style={styles.trendingButton}
            >
              <FontAwesome5 name="fire" size={24} color="#FF4C94" />
            </TouchableOpacity>
            <ThemedText style={styles.sectionTitle}>Trending Styles</ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.trendingCard}
            onPress={() => setIsSpringFashionVisible(true)}
          >
            <ThemedText style={styles.trendingText}>Spring Fashion 2024</ThemedText>
          </TouchableOpacity>
        </View>

        <SpringFashionGuide
          visible={isSpringFashionVisible}
          onClose={() => setIsSpringFashionVisible(false)}
        />

        {/* Trending Items Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isTrendingVisible}
          onRequestClose={() => setIsTrendingVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.trendingContainer}>
              <View style={styles.trendingHeader}>
                <ThemedText style={styles.trendingTitle}>Spring Fashion 2024</ThemedText>
                <TouchableOpacity 
                  onPress={() => setIsTrendingVisible(false)}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#333333" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={SPRING_OUTFITS}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={[
                      styles.outfitComboCard,
                      selectedOutfits.includes(item.id) && styles.selectedOutfitCard
                    ]}
                    onPress={() => {
                      if (selectedOutfits.includes(item.id)) {
                        setSelectedOutfits(selectedOutfits.filter(id => id !== item.id));
                      } else {
                        setSelectedOutfits([...selectedOutfits, item.id]);
                      }
                    }}
                  >
                    <View style={styles.outfitComboHeader}>
                      <ThemedText style={styles.outfitComboTitle}>{item.title}</ThemedText>
                      {selectedOutfits.includes(item.id) && (
                        <MaterialIcons name="check-circle" size={24} color="#FF4C94" />
                      )}
                    </View>
                    <View style={styles.outfitItemsContainer}>
                      {item.items.map((piece, index) => (
                        <View key={index} style={styles.outfitItem}>
                          <FontAwesome5 
                            name={piece.icon} 
                            size={20} 
                            color={piece.color} 
                          />
                          <ThemedText style={styles.outfitItemText}>{piece.name}</ThemedText>
                        </View>
                      ))}
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
              {selectedOutfits.length > 0 && (
                <TouchableOpacity style={styles.saveButton}>
                  <MaterialIcons name="check" size={24} color="#FFFFFF" />
                  <ThemedText style={styles.saveButtonText}>
                    Save {selectedOutfits.length} Selected
                  </ThemedText>
                </TouchableOpacity>
              )}
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
  weatherWidget: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherInfo: {
    marginLeft: 16,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  weatherText: {
    fontSize: 16,
    color: '#666666',
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
  outfitCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outfitText: {
    fontSize: 16,
    color: '#666666',
  },
  wardrobeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wardrobeItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  wardrobeIcon: {
    marginBottom: 8,
  },
  wardrobeCategory: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  trendingCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trendingText: {
    fontSize: 16,
    color: '#666666',
  },
  calendarButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    borderRadius: 20,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  trendingButton: {
    padding: 4,
  },
  trendingContainer: {
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
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  trendingItem: {
    width: '33.33%',
    padding: 12,
    alignItems: 'center',
  },
  trendingIcon: {
    marginBottom: 8,
  },
  trendingItemText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  outfitComboCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  selectedOutfitCard: {
    backgroundColor: '#FFF5F8',
    borderColor: '#FF4C94',
  },
  outfitComboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  outfitComboTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  outfitItemsContainer: {
    gap: 8,
  },
  outfitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 8,
  },
  outfitItemText: {
    marginLeft: 12,
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
  daySelector: {
    flexDirection: 'row',
    marginVertical: 12,
    paddingVertical: 4, // Add padding to make touch area larger
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
    minWidth: 70, // Add minimum width for better touch targets
  },
  selectedDayButton: {
    backgroundColor: '#FF4C94',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  timeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
  saveEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4C94',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  saveEventButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  savedEventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  savedEventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedEventDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 12,
  },
  savedEventTime: {
    fontSize: 14,
    color: '#666666',
  },
  removeEventButton: {
    padding: 4,
  },
});
