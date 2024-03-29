import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition, LauncherSize } from '../../types/commons';

import AppData from '../../samples/AppData';
import { LauncherSizeConfig, launcherSizeConfigs } from '../../utils/launcherSizeConfigs';
import { CATEGORIES } from '../../utils/storyCategories';
import { isTopOrBottom } from '../../utils/windowPositionHelpers';

import { AppListToggleId } from '../AppListToggle';

import AppList from './AppList';

let appListItems = AppData.reduce((acc: string[], data) => {
  acc.push(data.id);
  return acc;
}, []);
appListItems = [...appListItems.slice(0, appListItems.length - 1), AppListToggleId, ...appListItems.slice(appListItems.length - 1)];
const toggleIndex = appListItems.length - 2;

const setIsDragAndDrop = action('setIsDragAndDrop');

interface Props {
  height: number;
  isOverflowExpanded: boolean;
  launcherPosition: DirectionalPosition;
  launcherSizeConfig: LauncherSizeConfig;
  width: number;
}

interface State {
  appList: string[];
}

class AppListStory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      appList: appListItems,
    };
  }

  setAppIds = (appList: string[]) => {
    this.setState({
      appList,
    });
  };

  saveSettings = () => {
    action('saveSettings')(this.state.appList);
  };

  render() {
    const { height, isOverflowExpanded, width, launcherPosition, launcherSizeConfig } = this.props;
    const { appList } = this.state;

    return (
      <div style={{ height: '100vh', position: 'relative', width: '100vw' }}>
        <div style={{ display: 'inline-block', position: 'absolute', [launcherPosition]: 0 }}>
          <AppList
            appList={appList}
            toggleIndex={toggleIndex}
            height={height}
            isOverflowExpanded={isOverflowExpanded}
            launcherPosition={launcherPosition}
            launcherSizeConfig={launcherSizeConfig}
            saveSettings={this.saveSettings}
            setIsDragAndDrop={setIsDragAndDrop}
            setAppIds={this.setAppIds}
            width={width}
          />
        </div>
      </div>
    );
  }
}

storiesOf(`${CATEGORIES.COMPONENTS}AppList`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const launcherPosition = select('launcherPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const launcherSize = select('launcherSize', Object(LauncherSize), LauncherSize.Large);
    const isOverflowExpanded = boolean('isExpanded', false);
    const mainAxisLength = 700;
    const secondaryAxisLength = isOverflowExpanded ? 160 : 80;
    const isOnTopOrBottom = isTopOrBottom(launcherPosition);
    const width = isOnTopOrBottom ? mainAxisLength : secondaryAxisLength;
    const height = isOnTopOrBottom ? secondaryAxisLength : mainAxisLength;

    return (
      <AppListStory
        height={height}
        isOverflowExpanded={isOverflowExpanded}
        launcherPosition={launcherPosition}
        launcherSizeConfig={launcherSizeConfigs[launcherSize]}
        width={width}
      />
    );
  });
