import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {Fragment, useCallback} from 'react';
import {
  communityIcon,
  dashboardIcon,
  financeIcon,
  moreIcon,
} from '../../../utils/Icons';
import {theme} from '../../../utils';
const TabBar = ({state, navigation}) => {
  const tabBarIcon = useCallback((route, Focused) => {
    let routeName = route.name;
    let iconName;
    if (routeName === 'Home') {
      iconName = dashboardIcon;
    } else if (routeName === 'Community') {
      iconName = communityIcon;
    } else if (routeName === 'Finance') {
      iconName = financeIcon;
    } else if (routeName === 'More') {
      iconName = moreIcon;
    }
    return (
      <View style={{backgroundColor: '#fff'}} key={route.name}>
        <TouchableOpacity
          activeOpacity={0.6}
          key={route?.index}
          onPress={() => {
            // Navigate using the `navigation` prop that you received
            navigation.navigate(route.name);
          }}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={iconName}
              style={{
                width: 26,
                height: 26,
                tintColor: Focused
                  ? theme.colors.PRIMARY_COLOR
                  : theme.colors.TEXT_TITLE,
              }}
            />
          </View>
          <Text
            style={{
              color: Focused
                ? theme.colors.PRIMARY_COLOR
                : theme.colors.TEXT_TITLE,
              fontFamily: Focused ? 'Bold' : 'Light',
            }}>
            {route.name === 'Finance'
              ? 'My Finance'
              : route.name === 'Community'
              ? 'My Community'
              : route.name === 'Overview'
              ? 'Dashboard'
              : route.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const tabMap = useCallback(
    (element, index) => {
      const isFocused = state.index === index;
      return (
        <Fragment key={element?.name + index}>
          {tabBarIcon(element, isFocused)}
        </Fragment>
      );
    },
    [state.index]
  );

  return (
    <View style={styles.container}>
      <View style={styles.transitioningView}>{state.routes.map(tabMap)}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  transitioningView: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    paddingRight: 15,
    flexDirection: 'row',
    backgroundColor: theme.colors.BACKGROUND,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default React.memo(TabBar);
