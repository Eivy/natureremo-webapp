///<reference path="schema.d.ts" />
import React from 'react';
import './Device.scss';
import Appliance from './Appliance';

interface Props {
  device: RemoAPI.Device,
  appliances: Array<RemoAPI.Appliance>,
}

const Device: React.FC<Props> = React.memo((props) => {
    return (
      <div className="device">
        <header>
          <span className="nickname">{props.device.name}</span>
          <span className="sensor">
            {props.device.newest_events?.te && <span>温度:<span className="value">{props.device.newest_events!.te!.val}</span>℃</span>}
            {props.device.newest_events?.hu && <span className="humid">湿度:<span className="value">{props.device.newest_events!.hu!.val}</span>%</span>}
            {props.device.newest_events?.il && <span className="illumi">明るさ:<span className="value">{props.device.newest_events!.il!.val}</span></span>}
          </span>
        </header>
        <div className="appliances">
          {props.appliances.map((v) => <Appliance key={v.id} data={v} />)}
        </div>
      </div>
    );
});

export default Device;
