import {View, Text, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync(userData) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      // lightColor: '#FF231F7C',
    });
  }

  let {status} = await Notifications.getPermissionsAsync();

  let finalStatus = status;
  if (finalStatus !== 'granted') {
    let {status} = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.warn('notification permission error!');
  }
  const {data: token} = await Notifications.getExpoPushTokenAsync({
    experienceId: '@dvdurges/estate',
  });

  return token;
}

const CommonComponent = React.forwardRef((props, ref) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(' Notification==>', response);
      });
    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log('noifications=1=>', notification);
  //   return (
  //     <View>
  //       <Text>CommonComponent</Text>
  //     </View>
  //   );
});

export default CommonComponent;
