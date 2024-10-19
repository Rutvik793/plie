import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {fetchEvents} from '../api/service/PlieApiService';
import {AuthContext} from '../storage/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, removeItem} from '../storage/itemsSlice';
const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const {authToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);

  const toggleLike = id => {
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === id) {
          const updatedEvent = {...event, liked: !event.liked};

          // Create an object to dispatch with the event and the liked flag
          const eventWithLikeStatus = {
            ...updatedEvent,
            isLiked: updatedEvent.liked,
          };

          // Dispatch addItem or removeItem based on the new liked state
          if (updatedEvent.liked) {
            dispatch(addItem(eventWithLikeStatus));
            console.log('Added item:', JSON.stringify(eventWithLikeStatus));
          } else {
            dispatch(removeItem(eventWithLikeStatus));
            console.log('Removed item:', JSON.stringify(eventWithLikeStatus));
          }

          return updatedEvent;
        }
        return event;
      }),
    );
  };

  const transformEventData = event => {
    return {
      id: String(event.event_date_id), // Convert to string if needed
      title: event.event_name,
      date: event.readable_from_date, // Adjust this to include the end date if needed
      endDate: event.readable_to_date,
      price: `€${event.event_price_from} – €${event.event_price_to}`, // Adjust according to your needs
      location: `${event.city}, ${event.country}`,
      tags: event.keywords,
      image: event.event_profile_img || 'https://placehold.co/60x60', // Fallback image
      liked: event.isFavorite === 1, // Assuming isFavorite is 1 for true
      shared: false, // Set shared to false or implement your logic
    };
  };

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents(authToken);
        console.log('NEW DATA', JSON.stringify(data));
        const transformedEvents = data.data.events.map(transformEventData);
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [authToken]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  const toggleShare = id => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id ? {...event, shared: !event.shared} : event,
      ),
    );
  };

  const renderItem = ({item, itemid}) => {
    const isLiked = items.some(reduxItem => reduxItem.id === item.id);

    return (
      <TouchableOpacity>
        <View
          style={styles.eventContainer}
          key={`${item.event_date_id}-${itemid}`}>
          <Image source={{uri: item.image}} style={styles.eventImage} />
          <View style={styles.eventDetails}>
            <View style={styles.titleRow}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Icon name="arrow-right" style={styles.arrowIcon} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.eventDate}>{item.date}</Text>
              <Text
                style={{
                  left: 5,
                  textAlign: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                }}>
                {item.endDate}
              </Text>
            </View>
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
                {isLiked ? (
                  <Icon
                    name="heart"
                    style={[styles.actionIcon, styles.liked]}
                  />
                ) : (
                  <Icon
                    name="heart-o"
                    style={[styles.actionIcon, styles.liked]}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:27</Text>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subGreeting}>Are you ready to dance?</Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, indexid) => `${item.id}-${indexid}`} // Using index to ensure uniqueness
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
export default EventScreen;

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
