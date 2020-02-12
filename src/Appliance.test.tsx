import React from 'react';
import { render } from '@testing-library/react';
import Appliance from './Appliance';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

test('renders ico_light', () => {
  const { getByText } = render(<Appliance icon="ico_light" type="LIGHT" nickname="light" />);
  const altText= getByText('Light');
  expect(altText).toBeInTheDocument();
  const label = getByText('light');
  expect(label).toBeInTheDocument();
});

test('renders ico_etc', () => {
  const { getByText } = render(<Appliance icon="ico_etc" type="IR" nickname="machine" />);
  const altText= getByText('Etc');
  expect(altText).toBeInTheDocument();
  const label = getByText('machine');
  expect(label).toBeInTheDocument();
});

test('appliance which power', () => {
  const appliance = Enzyme.shallow(<Appliance icon="ico_light" type="LIGHT" nickname="light" status="off" />);
  let circle = appliance.find(".circle");
  expect(circle.at(0)).not.toBeNull();
  circle = appliance.find(".circle.on");
  expect(circle.length).toBe(0);
});

test('appliance which power on', () => {
  const appliance = Enzyme.shallow(<Appliance icon="ico_light" type="LIGHT" nickname="light" status="on" />);
  const circle = appliance.find(".circle.on").at(0);
  expect(circle).not.toBeNull();
});

