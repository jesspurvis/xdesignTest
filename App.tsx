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
import RocketList from './src/components/LaunchList';
import YearPicker from './src/components/YearPickerComponent';

export type Launch = {
  rocket: {rocket_name: string};
  flight_number: number;
  launch_date_unix: number;
  mission_name: string;
};

const FilterButton: React.FC<{
  title: string;
  icon: ImageSourcePropType;
  loadingFinished: boolean;
  onPress: (event: GestureResponderEvent) => void;
}> = ({title, onPress, icon, loadingFinished}) => {
  return (
    <TouchableOpacity
      style={styles.sortButton}
      onPress={onPress}
      disabled={loadingFinished}>
      <Text style={styles.buttonText}>{title}</Text>
      <Image source={icon} />
    </TouchableOpacity>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [launches, setlaunches] = useState([] as Launch[]);
  const [descending, setDescending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const sortArr = () => {
    setDescending(!descending);
    setlaunches(launches.reverse());
  };

  const filterByYear = (year: number) => {
    let filtered = launches.filter(
      value => new Date(value.launch_date_unix * 1000).getFullYear() === year,
    );

    setModalVisible(false);

    setlaunches(filtered);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const rocketResp = await fetch('https://api.spacexdata.com/v3/launches');

      const rocketData = await rocketResp.json();
      setlaunches(rocketData);
      setLoading(false);
      console.log('Fetched!');
    } catch (error) {
      console.warn('fetch Error: ', error);
      setLoading(false);
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
        <YearPicker
          visible={modalVisible}
          setModalVisible={setModalVisible}
          submitSelectedItem={filterByYear}
        />
        <Image
          source={require('./assets/spacex-logo.png')}
          style={styles.logo}
        />
        <View style={styles.buttonHolder}>
          <FilterButton
            loadingFinished={false}
            title="Reload Data"
            onPress={fetchData}
            icon={require('./assets/icon/refresh.png')}
          />
        </View>
        <View style={styles.buttonHolder}>
          <FilterButton
            loadingFinished={loading}
            title="Filter by year"
            onPress={() => setModalVisible(true)}
            icon={require('./assets/icon/select.png')}
          />
          <FilterButton
            loadingFinished={loading}
            title={descending ? 'Sort Ascending' : 'Sort Descending'}
            onPress={sortArr}
            icon={require('./assets/icon/sort.png')}
          />
        </View>

        <View style={styles.listHolder}>
          {loading ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <RocketList launches={launches} />
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
  listHolder: {height: '60%', width: '100%'},

  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white',
    width: '70%',
    fontFamily: 'BrandonGrotesque-Regular',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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
