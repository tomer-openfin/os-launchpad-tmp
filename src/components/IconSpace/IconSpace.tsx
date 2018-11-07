import * as React from 'react';

import { Background, Icon } from './index';

interface Props {
  backgroundImg?;
  iconImg?;
  draggable?: boolean;
  onClick?: () => void;
  large?: boolean;
}

const IconSpace = ({ backgroundImg, iconImg, draggable, onClick, large }: Props) => (
  <Background imgSrc={backgroundImg} draggable={draggable} onClick={onClick} large={large} clickable={!!onClick}>
      <Icon imgSrc={iconImg} draggable={draggable} large={large} />
  </Background >
);

export default IconSpace;
