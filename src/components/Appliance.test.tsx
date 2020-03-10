import React from 'react';
import { render } from '@testing-library/react';
import Appliance from './Appliance';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

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

test('appliance which light power is on', () => {
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
  const circle = appliance.find(".circle").get(0);
  expect(circle.props['className']).toContain('on');
});

test('appliance which aircon power is on', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon",
    type: "AC",
    image: "ico_ac_1",
    settings: {
      button: "",
    }
  }
  const appliance = Enzyme.shallow(<Appliance data={data} />);
  const circle = appliance.find(".circle").get(0);
  expect(circle.props['className']).toContain('on');
});

test('appliance which aircon power is off', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon",
    type: "AC",
    image: "ico_ac_1",
    settings: {
      button: "power-off",
    }
  }
  const appliance = Enzyme.shallow(<Appliance data={data} />);
  const circle = appliance.find(".circle").get(0);
  expect(circle.props['className']).toContain('off');
});

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

test('render ico_light', () => {
  const data: RemoAPI.Appliance = {
    nickname: "light",
    type: "IR",
    image: "ico_light",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Light");
  expect(circle).toBeInTheDocument();
});

test('render ico_tv', () => {
  const data: RemoAPI.Appliance = {
    nickname: "tv",
    type: "IR",
    image: "ico_tv",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("TV");
  expect(circle).toBeInTheDocument();
});

test('render ico_aircon1', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon",
    type: "IR",
    image: "ico_ac_1",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("AC1");
  expect(circle).toBeInTheDocument();
});

test('render ico_aircon2', () => {
  const data: RemoAPI.Appliance = {
    nickname: "aircon",
    type: "IR",
    image: "ico_ac_0",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("AC2");
  expect(circle).toBeInTheDocument();
});

test('render ico_curtain', () => {
  const data: RemoAPI.Appliance = {
    nickname: "curtain",
    type: "IR",
    image: "ico_curtain",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Curtain");
  expect(circle).toBeInTheDocument();
});

test('render ico_air_purifier', () => {
  const data: RemoAPI.Appliance = {
    nickname: "air_purifier",
    type: "IR",
    image: "ico_air_purifier",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("AirPurifier");
  expect(circle).toBeInTheDocument();
});

test('render ico_robot', () => {
  const data: RemoAPI.Appliance = {
    nickname: "robot",
    type: "IR",
    image: "ico_robot",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Robot");
  expect(circle).toBeInTheDocument();
});

test('render ico_fan', () => {
  const data: RemoAPI.Appliance = {
    nickname: "fan",
    type: "IR",
    image: "ico_fan",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Fan");
  expect(circle).toBeInTheDocument();
});

test('render ico_audio', () => {
  const data: RemoAPI.Appliance = {
    nickname: "audio",
    type: "IR",
    image: "ico_audio",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Audio");
  expect(circle).toBeInTheDocument();
});

test('render ico_av', () => {
  const data: RemoAPI.Appliance = {
    nickname: "av",
    type: "IR",
    image: "ico_av",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("AV");
  expect(circle).toBeInTheDocument();
});

test('render ico_etc', () => {
  const data: RemoAPI.Appliance = {
    nickname: "etc",
    type: "IR",
    image: "ico_etc",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Etc");
  expect(circle).toBeInTheDocument();
});

test('render something', () => {
  const data: RemoAPI.Appliance = {
    nickname: "etc",
    type: "IR",
    image: "something",
  }
  const appliance = render(<Appliance data={data} />);
  const circle = appliance.getByText("Etc");
  expect(circle).toBeInTheDocument();
});

test('event handler', () => {
  const mockConsole = jest.spyOn(console, 'log')
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
  const appliance = Enzyme.shallow(<Appliance data={data} onPowerClick={() => console.log('test')}/>);
  const button = appliance.find('button');
  button.at(1).simulate('click', {target: null, stopPropagation: () => {}});
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('without event handler', () => {
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
  const button = appliance.find('button');
  button.at(1).simulate('click', {target: null, stopPropagation: () => {}});
});
