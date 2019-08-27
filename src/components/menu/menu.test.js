import React from 'react';
import { shallow } from 'enzyme';
import Menu from './menu';

describe('<Menu />', () => {
  test('renders', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
