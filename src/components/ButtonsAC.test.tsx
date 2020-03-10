import * as React from 'react';
import {render} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ButtonsAC from './ButtonsAC';

Enzyme.configure({ adapter: new Adapter() })

const mockConsole = jest.spyOn(console, 'log');

describe('test ButtonsAC', () => {
  beforeEach(() => {
    mockConsole.mockReset();
  });
  test('wrong appliance', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "LIGHT",
    };
    const button = render(<ButtonsAC appliance={data} />);
    const label = button.getByText(/Wrong/);
    expect(label).toBeInTheDocument();
  });

  test('test signals', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: [
        {
          id: "test_signal",
          name: "Signal1",
          image: "ico_lightdown",
        }
      ]
    };
    const { getByText } = render(<ButtonsAC appliance={data} />);
    expect(getByText("Signal1")).toBeInTheDocument();
  });

  test('test default value "on"', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const input = ac.find('input[type="checkbox"]');
    expect(input.get(0).props.defaultChecked).toBe(true);
  });

  test('test default value "off"', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: 'power-off',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const input = ac.find('input[type="checkbox"]');
    expect(input.get(0).props.defaultChecked).toBe(false);
  });

  test('test to change mode value', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const selects = ac.find('select');
    selects.at(0).simulate('change', { target: { value: 'cool' } });
    expect(mockConsole.mock.calls[0][0]).toEqual({operation_mode: 'cool'});
  });

  test('test click power button', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const input = ac.find('input[type="checkbox"]');
    input.at(0).simulate('change', { 'target': {'checked': true}});
    expect(mockConsole.mock.calls.length).toBe(1);
    expect(JSON.stringify(mockConsole.mock.calls[0][0])).toBe(JSON.stringify({button: ''}));
    input.at(0).simulate('change', { 'target': {'checked': false}});
    expect(JSON.stringify(mockConsole.mock.calls[1][0])).toBe(JSON.stringify({button: 'power-off'}));
  });

  test('test render warm', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const selects = ac.find('select');
    expect(selects.get(0).props.defaultValue).toBe(data.settings!.mode);
    expect(selects.get(1).props.defaultValue).toBe(data.settings!.temp);
    expect(selects.get(2).props.defaultValue).toBe(data.settings!.dir);
    expect(selects.get(3).props.defaultValue).toBe(data.settings!.vol);
  });

  test('test render cool', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'cool',
        temp: '25',
        vol: 'auto',
        dir: 'swing',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const selects = ac.find('select');
    expect(selects.get(0).props.defaultValue).toBe(data.settings!.mode);
    expect(selects.get(1).props.defaultValue).toBe(data.settings!.temp);
    expect(selects.get(2).props.defaultValue).toBe(data.settings!.dir);
    expect(selects.get(3).props.defaultValue).toBe(data.settings!.vol);
  });

  test('test render dry', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'dry',
        temp: '25',
        vol: 'auto',
        dir: 'swing',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const selects = ac.find('select');
    expect(selects.get(0).props.defaultValue).toBe(data.settings!.mode);
    expect(selects.get(1).props.defaultValue).toBe(data.settings!.temp);
    expect(selects.get(2).props.defaultValue).toBe(data.settings!.dir);
    expect(selects.get(3).props.defaultValue).toBe(data.settings!.vol);
  });

  test('test render blow', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'blow',
        temp: '25',
        vol: 'auto',
        dir: 'swing',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const selects = ac.find('select');
    expect(selects.get(0).props.defaultValue).toBe(data.settings!.mode);
    expect(selects.get(1).props.defaultValue).toBe(data.settings!.temp);
    expect(selects.get(2).props.defaultValue).toBe(data.settings!.dir);
    expect(selects.get(3).props.defaultValue).toBe(data.settings!.vol);
  });

  test('test render auto', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'auto',
        temp: '25',
        vol: 'auto',
        dir: 'swing',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const selects = ac.find('select');
    expect(selects.get(0).props.defaultValue).toBe(data.settings!.mode);
    expect(selects.get(1).props.defaultValue).toBe(data.settings!.temp);
    expect(selects.get(2).props.defaultValue).toBe(data.settings!.dir);
    expect(selects.get(3).props.defaultValue).toBe(data.settings!.vol);
  });

  test('test to change temp value', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const selects = ac.find('select');
    selects.at(1).simulate('change', { target: { value: '18' } });
    expect(mockConsole.mock.calls.length).toBe(1);
  });

  test('test to change vol value', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const selects = ac.find('select');
    selects.at(2).simulate('change', { target: { value: '1' } });
    expect(mockConsole.mock.calls.length).toBe(1);
  });

  test('test to change dir value', () => {
    const data: RemoAPI.Appliance = {
      id: "test",
      type: "AC",
      aircon: {
        range: {
          modes: {
            warm: {
              temp: ['18','19','20','21'],
              vol: ['1','2','3','4','auto',''],
              dir: ['1','2','3','4','swing','auto',''],
            },
            cool: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            dry: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            blow: {
              temp: ['25','26'],
              vol: ['auto', ''],
              dir: ['swing'],
            },
            auto: {
              temp: [],
              vol: [],
              dir: [],
            },
          },
          fixedButtons: ['power-off'],
        },
        tempUnit: 'c',
      },
      settings: {
        mode: 'warm',
        temp: '18',
        vol: '2',
        dir: 'auto',
        button: '',
      },
      signals: []
    };
    const ac= Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const selects = ac.find('select');
    selects.at(3).simulate('change', { target: { value: 'swing' } });
    expect(mockConsole.mock.calls.length).toBe(1);
  });

});
