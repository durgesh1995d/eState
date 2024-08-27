import React, {useEffect, useState} from 'react';
import AppStackRoute from './AppStackRoute';
import AuthStackRoute from './AuthStackRoute';

const RouteSwitch = () => {
  const [islogin, setIslogin] = useState(false);
  useEffect(() => {}, []);
  return islogin ? <AuthStackRoute /> : <AppStackRoute />;
};

export default RouteSwitch;
