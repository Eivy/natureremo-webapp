import * as React from 'react';
import {render} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonsTV from './ButtonsTV';

Enzyme.configure({adapter: new Adapter()});

test('wrong appliance', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "LIGHT",
  };
  const button = render(<ButtonsTV appliance={data} />);
  const label = button.getByText(/Wrong/);
  expect(label).toBeInTheDocument();
});

test('test button', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: {
      buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
      ]
    },
    signals: []
  };
  const { getByText } = render(<ButtonsTV appliance={data} />);
  expect(getByText("電源")).toBeInTheDocument();
});

test('test buttons', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: {
      buttons: [
        {
          "name": "power",
          "image": "ico_io",
          "label": "TV_power"
        },
        {
          "name": "select-input-src",
          "image": "ico_input",
          "label": "TV_source"
        },
        {
          "name": "tv-schedule",
          "image": "ico_tv_guide",
          "label": "TV_schedule"
        },
        {
          "name": "mute",
          "image": "ico_mute",
          "label": "TV_mute"
        },
        {
          "name": "input-terrestrial",
          "image": "ico_tv",
          "label": "TV_terrestrial"
        },
        {
          "name": "input-bs",
          "image": "ico_bs",
          "label": "TV_BS"
        },
        {
          "name": "input-cs",
          "image": "ico_cs",
          "label": "TV_CS"
        },
        {
          "name": "select-audio",
          "image": "ico_select_audio",
          "label": "TV_select_audio"
        },
        {
          "name": "ch-1",
          "image": "ico_number_1",
          "label": "TV_1"
        },
        {
          "name": "ch-2",
          "image": "ico_number_2",
          "label": "TV_2"
        },
        {
          "name": "ch-3",
          "image": "ico_number_3",
          "label": "TV_3"
        },
        {
          "name": "ch-4",
          "image": "ico_number_4",
          "label": "TV_4"
        },
        {
          "name": "ch-5",
          "image": "ico_number_5",
          "label": "TV_5"
        },
        {
          "name": "ch-6",
          "image": "ico_number_6",
          "label": "TV_6"
        },
        {
          "name": "ch-7",
          "image": "ico_number_7",
          "label": "TV_7"
        },
        {
          "name": "ch-8",
          "image": "ico_number_8",
          "label": "TV_8"
        },
        {
          "name": "ch-9",
          "image": "ico_number_9",
          "label": "TV_9"
        },
        {
          "name": "ch-10",
          "image": "ico_number_10",
          "label": "TV_10"
        },
        {
          "name": "ch-11",
          "image": "ico_number_11",
          "label": "TV_11"
        },
        {
          "name": "ch-12",
          "image": "ico_number_12",
          "label": "TV_12"
        },
        {
          "name": "back",
          "image": "ico_return",
          "label": "TV_back"
        },
        {
          "name": "home",
          "image": "ico_home",
          "label": "TV_home"
        },
        {
          "name": "display",
          "image": "ico_display",
          "label": "TV_display_change"
        },
        {
          "name": "d",
          "image": "ico_d",
          "label": "TV_data"
        },
        {
          "name": "ch-up",
          "image": "ico_arrow_top",
          "label": "TV_next_channel"
        },
        {
          "name": "ch-down",
          "image": "ico_arrow_bottom",
          "label": "TV_previous_channel"
        },
        {
          "name": "left",
          "image": "ico_arrow_left",
          "label": "TV_left"
        },
        {
          "name": "up",
          "image": "ico_arrow_top",
          "label": "TV_top"
        },
        {
          "name": "right",
          "image": "ico_arrow_right",
          "label": "TV_right"
        },
        {
          "name": "down",
          "image": "ico_arrow_bottom",
          "label": "TV_bottom"
        },
        {
          "name": "ok",
          "image": "ico_record",
          "label": "TV_ok"
        },
        {
          "name": "vol-up",
          "image": "ico_plus",
          "label": "TV_volume_up"
        },
        {
          "name": "vol-down",
          "image": "ico_minus",
          "label": "TV_volume_down"
        },
        {
          "name": "blue",
          "image": "ico_color_blue",
          "label": "TV_blue"
        },
        {
          "name": "red",
          "image": "ico_color_red",
          "label": "TV_red"
        },
        {
          "name": "green",
          "image": "ico_color_green",
          "label": "TV_green"
        },
        {
          "name": "yellow",
          "image": "ico_color_yellow",
          "label": "TV_yellow"
        },
        {
          "name": "fast-rewind",
          "image": "ico_backward",
          "label": "TV_fast_rewind"
        },
        {
          "name": "play",
          "image": "ico_play",
          "label": "TV_play"
        },
        {
          "name": "record",
          "image": "ico_record",
          "label": "TV_record"
        },
        {
          "name": "fast-forward",
          "image": "ico_forward",
          "label": "TV_fast_forward"
        },
        {
          "name": "prev",
          "image": "ico_previous",
          "label": "TV_previous"
        },
        {
          "name": "pause",
          "image": "ico_pause",
          "label": "TV_pause"
        },
        {
          "name": "stop",
          "image": "ico_stop",
          "label": "TV_stop"
        },
        {
          "name": "next",
          "image": "ico_next",
          "label": "TV_next"
        },
        {
          "name": "rec-list",
          "image": "",
          "label": "TV_rec_list"
        },
        {
          "name": "subtitle",
          "image": "ico_subtitle",
          "label": "TV_subtitle"
        },
        {
          "name": "option",
          "image": "ico_option",
          "label": "TV_option"
        }
      ]
    },
    signals: []
  };
  const buttons = Enzyme.mount(<ButtonsTV appliance={data} />);
  expect(buttons.find('button').length).toBe(48);
});

test('test signals', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const { getByText } = render(<ButtonsTV appliance={data} />);
  expect(getByText("Signal1")).toBeInTheDocument();
});

test('test signal click', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const mockConsole = jest.spyOn(console, 'log');
  mockConsole.mockReset();
  const buttons = Enzyme.mount(<ButtonsTV appliance={data} onSignalClick={() => console.log('test')} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('test signal click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [] },
    signals: [
      {
        id: "test_signal",
        name: "Signal1",
        image: "ico_lightdown",
      }
    ]
  };
  const buttons = Enzyme.mount(<ButtonsTV appliance={data} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
});

test('test button click', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
    ] },
    signals: []
  };
  const mockConsole = jest.spyOn(console, 'log');
  mockConsole.mockReset();
  const buttons = Enzyme.mount(<ButtonsTV appliance={data} onButtonClick={() => console.log('test')} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
  expect(mockConsole.mock.calls.length).toBe(1);
});

test('test button click without handler', () => {
  const data: RemoAPI.Appliance = {
    id: "test",
    type: "TV",
    tv: { buttons: [
        {
          "image": "ico_timer",
          "name": "Power",
          "label": "電源",
        }
    ] },
    signals: []
  };
  const buttons = Enzyme.mount(<ButtonsTV appliance={data} />);
  const button = buttons.find('button').at(0);
  button.simulate('click');
});
