import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {DEVICE_WINDOW_WIDTH} from '../../utils/config';
import {theme} from '../../utils';
import {AntDesign} from 'react-native-vector-icons';

const MovieListingCard = (props) => {
  return (
    <TouchableOpacity onPress={props?.onPress}>
      <View style={styles.cardStyle}>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: 'https://picsum.photos/200/300/?blur=2',
            }}
            style={styles.image}
          />
          <View style={styles.textPostion}>
            <Text style={styles.title}>{props?.data?.title}</Text>
            <Text style={styles.title}>{props?.data?.year}</Text>
          </View>
          <View style={{position: 'absolute', top: 5, right: 5, padding: 3}}>
            <TouchableOpacity onPress={props?.onLike}>
              {props?.data?.like ? (
                <AntDesign name={'heart'} size={25} color={'#aaa'} />
              ) : (
                <AntDesign name={'hearto'} size={25} color={'#aaa'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: theme.colors.LIGHT_GRAY,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageView: {
    width: DEVICE_WINDOW_WIDTH / 3 - 10,
  },
  image: {
    width: '100%',
    height: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: theme.FONT_SIZES.body,
    fontWeight: 'bold',
    color: theme.colors.TEXT_BUTTON,
  },

  textPostion: {
    width: DEVICE_WINDOW_WIDTH / 3 - 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#555',
    opacity: 0.6,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 5,
  },
});

export default React.memo(MovieListingCard);
