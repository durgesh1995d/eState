import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {DEVICE_WINDOW_WIDTH} from '../../utils/config';
import {theme} from '../../utils';

const ListingCard = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageView}>
            <Image source={{uri: props?.data?.image}} style={styles.image} />
          </View>
          <View style={{marginHorizontal: 10}}>
            <Text style={styles.title}>{props?.data?.address}</Text>
            <Text numberOfLines={1} style={styles.desc}>
              {props?.data?.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderColor: theme.colors.LIGHT_GRAY,
  },
  imageView: {
    width: DEVICE_WINDOW_WIDTH / 3 - 40,
    height: 80,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: theme.FONT_SIZES.headH5,
    fontWeight: 'bold',
    color: theme.colors.PRIMARY_COLOR,
  },
  desc: {
    paddingTop: 5,
    fontSize: theme.FONT_SIZES.body,
    width: DEVICE_WINDOW_WIDTH / 2,
  },
});

export default React.memo(ListingCard);
