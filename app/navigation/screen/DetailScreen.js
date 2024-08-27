import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {theme} from '../../utils';

const DetailScreen = (props) => {
  const [data, setData] = useState('');
  useEffect(() => {
    setData(props.route.params?.data);
  }, [props.route.params?.data]);
  return (
    <View style={styles.container}>
      <Image source={{uri: data?.image}} style={styles.image} />
      <View style={styles.rowView}>
        <Text style={styles.headerText}>Address</Text>
        <Text style={styles.detailText}>{data?.address}</Text>
      </View>
      <View style={[styles.rowView, {flexDirection: 'column'}]}>
        <Text style={styles.headerText}>Description</Text>
        <Text style={styles.detailText}>{data?.description}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  image: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 250,
  },
  rowView: {
    borderTopWidth: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.colors.LIGHT_GRAY,
  },
  headerText: {
    fontSize: theme.FONT_SIZES.headH4,
    fontWeight: 'bold',
    color: theme.colors.TEXT_TITLE,
  },
  detailText: {
    fontSize: theme.FONT_SIZES.headH5,
    color: theme.colors.TEXT_LABEL,
  },
});

export default DetailScreen;
