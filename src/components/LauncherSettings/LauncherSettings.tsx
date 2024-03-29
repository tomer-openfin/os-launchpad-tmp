import * as React from 'react';

import { DirectionalPosition, LauncherSize } from '../../types/commons';
import { ROUTES } from '../Router/consts';
import { Cta, Group, Heading, Row, StyledRadioButton, Wrapper } from './LauncherSettings.css';

import DirectionControls from '../DirectionControls';

const LAUNCHER_SIZE_NAME = 'launcherSize-options';

interface Props {
  isChangeLauncherMonitorDisabled?: boolean;
  launcherSize: LauncherSize;
  launcherPosition: DirectionalPosition;
  setLauncherPosition: (launcherPosition: DirectionalPosition) => void;
  setLauncherSize: (launcherSize: LauncherSize) => void;
}

const LauncherSettings = ({ isChangeLauncherMonitorDisabled, launcherSize, launcherPosition, setLauncherPosition, setLauncherSize }: Props) => {
  const handleLauncherSize = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setLauncherSize(e.currentTarget.value as LauncherSize);
  };

  return (
    <Wrapper>
      <Group>
        <Heading>Launcher Size</Heading>

        <Row>
          <StyledRadioButton onChange={handleLauncherSize} checked={launcherSize === LauncherSize.Small} name={LAUNCHER_SIZE_NAME} value={LauncherSize.Small}>
            Sm
          </StyledRadioButton>

          <StyledRadioButton onChange={handleLauncherSize} checked={launcherSize === LauncherSize.Large} name={LAUNCHER_SIZE_NAME} value={LauncherSize.Large}>
            Lg
          </StyledRadioButton>
        </Row>
      </Group>

      <Group>
        <Heading>Launcher Location</Heading>

        <Row>
          <DirectionControls direction={launcherPosition} handleChange={setLauncherPosition} />

          {!isChangeLauncherMonitorDisabled && (
            <Cta
              isDisabled={isChangeLauncherMonitorDisabled}
              onClick={
                isChangeLauncherMonitorDisabled
                  ? e => {
                      e.preventDefault();
                    }
                  : undefined
              }
              to={ROUTES.SETTINGS_LAUNCHER_MONITOR}
            >
              Change Screen
            </Cta>
          )}
        </Row>
      </Group>
    </Wrapper>
  );
};

export default LauncherSettings;
