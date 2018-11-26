import * as enzyme from 'enzyme';
import * as React from 'react';

import ConfirmUserDelete from '../';

import noop from '../../../utils/noop';

// mock .location.state structure from using react-router
const currentUserData = {
  location: {
    state: {
      firstName: 'John',
      id: '1',
      lastName: 'Doe',
    },
  },
};

describe('<ConfirmUserDelete />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<ConfirmUserDelete deleteUser={noop} location={currentUserData.location} />).is('div'));
  });
});