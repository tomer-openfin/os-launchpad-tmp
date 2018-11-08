import * as React from 'react';

import { Background, Icon } from './IconSpace.css';

interface Props {
  backgroundImg?;
  iconImg?;
  draggable?: boolean;
  onClick?: () => void;
  large?: boolean;
  small?: boolean;
  hover?: boolean;
}

const IconSpace = ({ backgroundImg, iconImg, draggable, onClick, large, small, hover }: Props) => (
  <Background imgSrc={backgroundImg} draggable={draggable} onClick={onClick} large={large} clickable={!!onClick}>
    <Icon imgSrc={iconImg} draggable={draggable} large={large} small={small} hover={hover} />
  </Background>
);

export default IconSpace;
