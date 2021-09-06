import { translate } from '../../../i18n/index';
import React from 'react';
import { TextBold, TextRegular } from '../../assets/styles';

import { Container } from './styles';

function Home() {
  return (
    <Container>
      <TextBold>{translate('home')}</TextBold>
    </Container>
  );
}

export default Home;