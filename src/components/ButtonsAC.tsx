/// <reference path="../schema.d.ts" />
import * as React from 'react';
import Button from './Button';
import Signal from './Signal';

interface Props {
  appliance: RemoAPI.Appliance,
}

const ButtonsAC : React.FC<Props> = React.memo((props) => {
  if (props.appliance.type !== "AC") {
    return <div>Wrong appliance!!</div>;
  }
  return (
    <div>
      <div>
        { props.appliance.tv!.buttons!.map((v: RemoAPI.Button, i: number) => <Button key={i} button={v} />) }
      </div>
      <div>
        { props.appliance.signals!.map((v: RemoAPI.Signal, i: number) => <Signal key={i} signal={v} />) }
      </div>
    </div>
  )
});

export default ButtonsAC;
