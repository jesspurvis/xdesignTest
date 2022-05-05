import React, {useState} from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const rocketYears = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
  2019, 2020,
];

const YearPicker: React.FC<{
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  submitSelectedItem: (item: number) => void;
}> = ({visible, setModalVisible, submitSelectedItem}) => {
  const [selected, setSelected] = useState(0);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Please pick a year</Text>
          <Picker
            style={styles.picker}
            selectedValue={selected}
            onValueChange={itemValue => setSelected(itemValue)}>
            <Picker.Item label={'All Years'} value={0} />
            {rocketYears.map(item => (
              <Picker.Item key={item} label={item.toString()} value={item} />
            ))}
          </Picker>

          <Button
            title="Select year"
            onPress={() => submitSelectedItem(selected)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  picker: {width: 200},
});

export default YearPicker;
