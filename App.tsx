/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RocketList from './src/components/RocketList';

const FilterButton: React.FC<{
  title: string;
  icon: ImageSourcePropType;
  onPress: (event: GestureResponderEvent) => void;
}> = ({title, onPress, icon}) => {
  return (
    <TouchableOpacity style={styles.sortButton} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [rockets, setRockets] = useState([]);
  const [descending, setDescending] = useState(false);

  const sortArr = () => {
    setDescending(!descending);
    setRockets(rockets.reverse());
  };

  const fetchData = async () => {
    try {
      const rocketResp = await fetch('https://api.spacexdata.com/v3/launches');

      const rocketData = await rocketResp.json();
      setRockets(rocketData);
      console.log('Fetched!');
    } catch (error) {
      console.warn('fetch Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Image
          source={require('./assets/spacex-logo.png')}
          style={styles.logo}
        />
        <View style={styles.buttonHolder}>
          <FilterButton
            title="Reload Data"
            onPress={fetchData}
            icon={require('./assets/icon/refresh.png')}
          />
        </View>
        <View style={styles.buttonHolder}>
          <FilterButton
            title="Filter by year"
            onPress={() => console.log('beep')}
            icon={require('./assets/icon/select.png')}
          />
          <FilterButton
            title={descending ? 'Sort by Ascending' : 'Sort by Descending'}
            onPress={sortArr}
            icon={require('./assets/icon/sort.png')}
          />
        </View>

        <View style={{height: '60%', width: '100%'}}>
          {rockets.length !== 0 ? (
            <RocketList rockets={rockets} />
          ) : (
            <ActivityIndicator size={'large'} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.lighter,

    justifyContent: 'space-evenly',
  },
  logo: {width: '80%', resizeMode: 'contain', alignSelf: 'center'},
  buttonHolder: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },

  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
    width: '70%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'BrandonGrotesque-Regular',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sortButton: {
    backgroundColor: '#215184',
    height: 45,
    width: 150,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
