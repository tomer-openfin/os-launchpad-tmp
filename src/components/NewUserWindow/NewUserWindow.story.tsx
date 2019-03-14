import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { forceReRender, storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import NewUserWindow from './NewUserWindow';

const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');
const createUser = action('createUser');
const onEscDown = action('onEscDown');

const onResponseErrorNoop = (callback?: () => void) => (error?: Error) => {
  return;
};
const onResponseSuccessNoop = (callback?: () => void) => () => {
  return;
};

let isClosed = true;

storiesOf(`${CATEGORIES.ADMIN}NewUserWindow`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const reset = () => {
      isClosed = true;
      forceReRender();
    };
    const handleOpen = () => {
      isClosed = false;
      forceReRender();
    };

    const error = boolean('Error', !isClosed);

    if (error && isClosed) handleOpen();

    const errorMessage = text('Error Message', 'Failed to create');

    return (
      <NewUserWindow
        createUser={createUser}
        handleCancel={handleCancel}
        handleSuccess={handleSuccess}
        onEscDown={onEscDown}
        onResponseError={onResponseErrorNoop}
        onResponseSuccess={onResponseSuccessNoop}
        resetResponseError={reset}
        responseError={error}
        responseMessage={errorMessage}
      />
    );
  });
