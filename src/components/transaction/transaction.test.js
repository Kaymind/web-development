import React from 'react';
import { shallow } from 'enzyme';
import Transaction from './transaction';

describe('<Transaction />', () => {
  test('renders', () => {
    const wrapper = shallow(<Transaction />);
    expect(wrapper).toMatchSnapshot();
  });
});
