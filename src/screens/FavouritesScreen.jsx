import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {updateItem, removeItem} from '../storage/itemsSlice';
import {useSelector, useDispatch} from 'react-redux';
const eventsData = [
  {
    id: '1',
    title: 'ADICTO: Berlin Festival',
    date: '24.02.2022 – 26.02.2022',
    price: '€30 – €100',
    location: 'Berlin, Germany',
    tags: ['Workshop', 'Bachata'],
    image: 'https://placehold.co/60x60',
    liked: true,
    shared: false,
  },
  {
    id: '2',
    title: 'Bachata: Open level',
    date: '27.02.2022 @8pm',
    price: '€12',
    location: 'Berlin, Germany',
    tags: ['Course', 'Bachata'],
    image: 'https://placehold.co/60x60',
    liked: false,
    shared: false,
  },
  {
    id: '3',
    title: 'SSD Rovinj 2022',
    date: '07.06.2022 – 13.06.2022',
    price: '€65 – €450',
    location: 'Rovinj, Croatia',
    tags: ['Festival', 'Bachata'],
    image: 'https://placehold.co/60x60',
    liked: false,
    shared: false,
  },
  {
    id: '4',
    title: 'Berlin Sensual Nights',
    date: '29.02.2022 | 21:00 – 04:00',
    price: '€7',
    location: 'Berlin, Germany',
    tags: ['Party', 'Bachata', 'Salsa', 'Kiz'],
    image: 'https://placehold.co/60x60',
    liked: true,
    shared: false,
  },
  {
    id: '5',
    title: 'Salsa & Bachata Night',
    date: '05.03.2022 | 19:00 – 01:00',
    price: '€8',
    location: 'Berlin, Germany',
    tags: ['Course', 'Party', 'Bachata', 'Salsa'],
    image: 'https://placehold.co/60x60',
    liked: false,
    shared: false,
  },
  {
    id: '6',
    title: 'Soda Social Club – Salsa, Bachata, ...',
    date: '06.03.2022 | 19:00 – 02:00',
    price: '€8',
    location: 'Berlin, Germany',
    tags: ['Party', 'Bachata', 'Salsa', 'Kiz'],
    image: 'https://placehold.co/60x60',
    liked: false,
    shared: false,
  },
];

const FavouritesScreen = () => {
  // const [events, setEvents] = useState(eventsData);
  const dispatch = useDispatch();
  const events = useSelector(state => state.items);

  const toggleLike = id => {
    const eventToToggle = events.find(event => event.id === id);

    if (eventToToggle) {
      const updatedEvent = {...eventToToggle, liked: !eventToToggle.liked};

      // Create an object to dispatch with the event and the liked flag
      const eventWithLikeStatus = {
        ...eventToToggle,
        isLiked: updatedEvent.liked,
      };

      // Dispatch removeItem first, then dispatch updateItem
      // This assumes you're removing the old state first
      dispatch(removeItem(eventWithLikeStatus));
      dispatch(updateItem(eventWithLikeStatus)); // Update the event in the store with the new liked state

      console.log('Updated event:', JSON.stringify(eventWithLikeStatus));
    }
  };

  const toggleShare = id => {
    const eventToUpdate = events.find(event => event.id === id);
    if (eventToUpdate) {
      dispatch(updateItem({...eventToUpdate, shared: !eventToUpdate.shared}));
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.eventContainer}>
      <Image source={{uri: item.image}} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <View style={styles.titleRow}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Icon name="arrow-right" style={styles.arrowIcon} />
        </View>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventPrice}>{item.price}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.eventActions}>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => toggleShare(item.id)}>
            <Feather
              name="share"
              style={[
                styles.actionIcon,
                item.shared ? styles.shared : styles.notShared,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            {item.liked ? (
              <Icon name="heart" style={[styles.actionIcon, styles.liked]} />
            ) : (
              <Icon name="heart-o" style={[styles.actionIcon, styles.liked]} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:27</Text>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subGreeting}>Are you ready to dance?</Text>
      </View>

      {events.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>No Data Available</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};
export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  time: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'right',
    width: '100%',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#6b7280',
  },
  list: {
    padding: 16,
  },
  eventContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  eventDetails: {
    flex: 1,
    marginLeft: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#181A1F',
  },
  eventDate: {
    color: '#34A853',
    fontSize: 12,
  },
  eventPrice: {
    color: '#181A1F',
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e5e7eb',
    color: '#181A1F',
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  eventActions: {
    alignItems: 'flex-end',
  },
  eventLocation: {
    color: '#181A1F',
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    top: 20,
  },
  actionIcon: {
    fontSize: 24,
    color: '#6b7280',
    marginLeft: 8,
  },
  liked: {
    color: '#10b981',
  },
  notLiked: {
    color: '#6b7280',
  },
  shared: {
    color: '#181A1F',
  },
  notShared: {
    color: '#181A1F',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#181A1F',
    marginLeft: 8,
    left: 73,
    paddingBottom: 5,
  },
});
