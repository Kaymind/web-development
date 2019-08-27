import React from 'react';
import { shallow } from 'enzyme';
import StockEdit from './stockEdit';

describe('<StockEdit />', () => {
  test('renders', () => {
    const wrapper = shallow(<StockEdit />);
    expect(wrapper).toMatchSnapshot();
  });
});
