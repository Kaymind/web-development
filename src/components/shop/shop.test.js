import React from 'react';
import { shallow } from 'enzyme';
import Shop from './shop';

describe('<Shop />', () => {
  test('renders', () => {
    const wrapper = shallow(<Shop />);
    expect(wrapper).toMatchSnapshot();
  });
});
