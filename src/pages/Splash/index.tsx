import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => navigation.navigate('Home'), 500)
  }, [])

  return <Container />;
}

export default Splash;