import * as enzyme from 'enzyme';
import * as React from 'react';

import App from '../';

describe('<App />', () => {
  it('renders a <div>', () => {
    expect(enzyme.shallow(<App />).is('div'));
  });
});
