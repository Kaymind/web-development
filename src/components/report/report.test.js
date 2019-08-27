import React from 'react';
import { shallow } from 'enzyme';
import Report from './report';

describe('<Report />', () => {
  test('renders', () => {
    const wrapper = shallow(<Report />);
    expect(wrapper).toMatchSnapshot();
  });
});
