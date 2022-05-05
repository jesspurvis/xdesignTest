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

function ordinal(n: number) {
  var s = ['th', 'st', 'nd', 'rd'];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function dateFormatter(date: any) {
  let luxonDate = DateTime.fromSeconds(date);
  return `${ordinal(luxonDate.day)} ${luxonDate.toFormat('LLL kkkk')}`;
}

const RocketListItem = ({item}: {item: any}) => (
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

const RocketList: React.FC<{
  rockets: Array<any>;
}> = ({rockets}) => {
  return (
    <FlatList
      data={rockets}
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
    paddingHorizontal: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {height: 3, width: 0},
  },
  sectionContainer: {
    height: 50,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },

  sectionText: {
    fontSize: 10,
    fontWeight: '500',
    alignSelf: 'center',
  },

  dateText: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  rocketText: {
    fontSize: 10,
    fontWeight: '700',
    alignSelf: 'flex-end',
    textAlign: 'right',
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

export default RocketList;
