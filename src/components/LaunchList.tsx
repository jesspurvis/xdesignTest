/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {DateTime} from 'luxon';
import {Launch} from '../../App';

function ordinal(n: number) {
  var s = ['th', 'st', 'nd', 'rd'];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function dateFormatter(date: any) {
  let luxonDate = DateTime.fromSeconds(date);
  return `${ordinal(luxonDate.day)} ${luxonDate.toFormat('LLL kkkk')}`;
}

const RocketListItem = ({item}: {item: Launch}) => (
  <View style={styles.listItem}>
    <Text style={styles.sectionTitle}>#{item.flight_number}</Text>
    <Text style={[styles.sectionTitle, {width: '50%'}]}>
      {item.mission_name}
    </Text>
    <View style={{alignSelf: 'center'}}>
      <Text style={styles.dateText}>
        {dateFormatter(item.launch_date_unix)}
      </Text>
      <Text style={styles.rocketText}>{item.rocket.rocket_name}</Text>
    </View>
  </View>
);

const LaunchList: React.FC<{
  launches: Array<Launch>;
}> = ({launches}) => {
  return (
    <FlatList
      data={launches}
      keyExtractor={item => item.flight_number + ' ' + item.launch_date_unix}
      renderItem={RocketListItem}
      style={styles.flatlistStyle}
      contentContainerStyle={{padding: 5}}
    />
  );
};

const styles = StyleSheet.create({
  flatlistStyle: {
    width: '90%',
    alignSelf: 'center',
  },

  listItem: {
    height: 60,
    backgroundColor: 'white',
    width: '100%',

    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {height: 3, width: 0},
  },
  sectionContainer: {
    height: 50,
  },
  sectionTitle: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '500',
    color: '#545454',
    fontFamily: 'BrandonGrotesque-Regular',
  },

  dateText: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'right',
    alignSelf: 'flex-end',
    color: '#545454',
    fontFamily: 'BrandonGrotesque-Regular',
  },
  rocketText: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-end',
    textAlign: 'right',
    color: '#545454',
    fontFamily: 'BrandonGrotesque-Regular',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default LaunchList;
