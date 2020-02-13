import React from 'react';
import { render } from '@testing-library/react';
import Appliance from './Appliance';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

test('renders ico_light', () => {
  const appliance: RemoAPI.Appliance = {
    nickname: "light",
    type: "LIGHT",
    image: "ico_light",
    light: {
      state: {
        power: "on"
      }
    }
  }
  const { getByText } = render(<Appliance data={appliance}/>);
  const altText= getByText('Light');
  expect(altText).toBeInTheDocument();
  const label = getByText('light');
  expect(label).toBeInTheDocument();
});

test('renders ico_etc', () => {
  const appliance: RemoAPI.Appliance = {
    nickname: "machine",
    type: "IR",
    image: "ico_etc",
    light: {
      state: {
        power: "on"
      }
    }
  }
  const { getByText } = render(<Appliance data={appliance} />);
  const altText= getByText('Etc');
  expect(altText).toBeInTheDocument();
  const label = getByText('machine');
  expect(label).toBeInTheDocument();
});

test('appliance which power', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light",
    type: "LIGHT",
    image: "ico_light",
    light: {
      state: {
        power: "off"
      }
    }
  }
  const appliance = Enzyme.shallow(<Appliance data={data} />);
  let circle = appliance.find(".circle");
  expect(circle.at(0)).not.toBeNull();
  circle = appliance.find(".circle.on");
  expect(circle.length).toBe(0);
});

test('appliance which power on', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light",
    type: "LIGHT",
    image: "ico_light",
    light: {
      state: {
        power: "on"
      }
    }
  }
  const appliance = Enzyme.shallow(<Appliance data={data} />);
  const circle = appliance.find(".circle.on").at(0);
  expect(circle).not.toBeNull();
});

