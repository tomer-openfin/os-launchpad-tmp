import * as React from 'react';

import * as restoreLayoutIcon from '../../assets/RestoreLayout.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';

import IconSpace from '../IconSpace';

import { DirectionalPosition } from '../../types/commons';

import { Wrapper } from './Layouts.css';

interface Props {
  isApplicationDrawerExpanded: boolean;
  launcherPosition: DirectionalPosition;
  layoutIds: string[];
  onBlur: () => void;
  restoreLayout: (id: string) => void;
  saveLayout: (id: string) => void;
}

const Layouts = ({ isApplicationDrawerExpanded, launcherPosition, layoutIds, saveLayout, onBlur, restoreLayout }: Props) => {
  const handleClickCreator = (fn, ...args) => () => {
    onBlur();
    fn(...args);
  };

  return (
    <Wrapper launcherPosition={launcherPosition} isExpanded={isApplicationDrawerExpanded}>
      <IconSpace iconImg={saveLayoutIcon} onClick={handleClickCreator(saveLayout, layoutIds[0])} hover />

      <IconSpace iconImg={restoreLayoutIcon} onClick={handleClickCreator(restoreLayout, layoutIds[0])} hover />
    </Wrapper>
  );
};

export default Layouts;
