import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/commons';
import { withMarginDecoractor } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import { defaultProps } from '../SvgIcon/index';
import SvgIconWithExtension from './SvgIconWithExtension';

const { STORYBOOK_SVGS } = process.env;
const SVGS = STORYBOOK_SVGS ? JSON.parse(STORYBOOK_SVGS) : [];
const defaultSize = typeof defaultProps.size! === 'string' ? String(defaultProps.size!) : `${defaultProps.size!}px`;

const onClick = action('clicked');

storiesOf(`${CATEGORIES.COMPONENTS}SvgIconWithExtension`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecoractor(15))
  .add('default', () => {
    const extensionPosition = select('extensionPosition', Object(DirectionalPosition), DirectionalPosition.Top);
    const imgSrc = select('Svg', SVGS, SVGS[0]);
    const size = text('size', defaultSize);
    const color = text('color', defaultProps.color!);
    const hoverColor = text('hoverColor', defaultProps.hoverColor!);
    const clickable = boolean('clickable', false);
    const disabled = boolean('disabled', false);

    return (
      <SvgIconWithExtension
        extensionPosition={extensionPosition}
        color={color}
        disabled={disabled}
        hoverColor={hoverColor}
        imgSrc={imgSrc ? require(`../../assets/${imgSrc}`) : ''}
        onClick={clickable ? onClick : null}
        size={size}
      />
    );
  });
