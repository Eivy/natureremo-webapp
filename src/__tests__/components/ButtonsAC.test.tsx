import * as React from 'react';
import {render} from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import ButtonsAC from '../../components/ButtonsAC';

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

  test('test click signal', () => {
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
    const buttons = Enzyme.mount(<ButtonsAC appliance={data} onSignalClick={() => console.log('test')} />);
    buttons.find('.signals button').at(0).simulate('click');
    expect(mockConsole.mock.calls.length).toBe(1);
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
    const input = ac.find('button');
    input.at(0).simulate('click');
    expect(mockConsole.mock.calls.length).toBe(1);
    expect(mockConsole.mock.calls[0][0]).toEqual({button: 'power-off'});
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
    let select = ac.find('select[className="temp"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.temp);
    select = ac.find('select[className="vol"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.vol);
    select = ac.find('select[className="dir"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.dir);
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
    let select = ac.find('select[className="temp"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.temp);
    select = ac.find('select[className="vol"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.vol);
    select = ac.find('select[className="dir"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.dir);
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
    let select = ac.find('select[className="temp"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.temp);
    select = ac.find('select[className="vol"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.vol);
    select = ac.find('select[className="dir"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.dir);
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
    let select = ac.find('select[className="temp"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.temp);
    select = ac.find('select[className="vol"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.vol);
    select = ac.find('select[className="dir"]');
    expect(select.get(0).props.defaultValue).toBe(data.settings!.dir);
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
    expect(selects.length).toBe(0);
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
    const selects = ac.find('.mode button');
    selects.at(2).simulate('click');
    expect(mockConsole.mock.calls[0][0]).toEqual({operation_mode: 'cool'});
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
    const selects = ac.find('select[className^="temp"]');
    selects.at(0).simulate('change', { target: { value: '18' } });
    expect(mockConsole.mock.calls[0][0]).toEqual({temperature: '18'});
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
    const ac = Enzyme.mount(<ButtonsAC appliance={data} onChange={(data) => console.log(data)} />);
    const selects = ac.find('select[className^="vol"]');
    selects.at(0).simulate('change', { target: { value: '1' } });
    expect(mockConsole.mock.calls[0][0]).toEqual({air_volume: '1'});
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
    const selects = ac.find('select[className^="dir"]');
    selects.at(0).simulate('change', { target: { value: 'swing' } });
    expect(mockConsole.mock.calls[0][0]).toEqual({air_direction: 'swing'});
  });

  test('test to change values without handler', () => {
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
    const ac= Enzyme.mount(<ButtonsAC appliance={data} />);
    const input = ac.find('.mode button');
    input.at(0).simulate('change', { 'target': {'checked': true}});
    let selects = ac.find('.mode button');
    selects.at(1).simulate('click');
    selects = ac.find('select[className^="temp"]');
    selects.at(0).simulate('change', { target: { value: '25' } });
    selects = ac.find('select[className^="dir"]');
    selects.at(0).simulate('change', { target: { value: '1' } });
    selects = ac.find('select[className^="vol"]');
    selects.at(0).simulate('change', { target: { value: '1' } });
  });

});
