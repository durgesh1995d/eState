import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {theme} from '../../utils';

const Button = ({onPress, title = 'click', style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.buttonView, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: theme.colors.PRIMARY_COLOR,
    borderRadius: 10,
  },
  buttonText: {
    color: theme.colors.TEXT_BUTTON,
    fontSize: theme.FONT_SIZES.headH4,
  },
});

export default React.memo(Button);
