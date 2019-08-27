import React from 'react';
import { shallow } from 'enzyme';
import StockCreate from './stockCreate';

describe('<StockCreate />', () => {
  test('renders', () => {
    const wrapper = shallow(<StockCreate />);
    expect(wrapper).toMatchSnapshot();
  });
});
