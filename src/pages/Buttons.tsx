import { Switch, Match } from 'solid-js';
import { useParams } from '@solidjs/router';
import { appliances } from '../store';
import { updateAppliance } from '../store';
import ButtonsLight from '../components/ButtonsLight';
import ButtonsTV from '../components/ButtonsTV';
import ButtonsAC from '../components/ButtonsAC';
import ButtonsIR from '../components/ButtonsIR';
import Api from '../Api';

export default function Buttons() {
  const params = useParams<{ id: string }>();

  const appliance = () => appliances().find((v) => v.id === params.id);

  const sendLightButton = async (button: RemoAPI.Button) => {
    const new_state = await Api.SendLightButton(params.id, button.name!);
    const tmp = appliance();
    if (tmp) {
      const updated = { ...tmp, light: { ...tmp.light!, state: new_state } };
      updateAppliance(params.id, updated);
    }
  };

  const sendTVButton = (button: RemoAPI.Button) => {
    Api.SendTVButton(params.id, button.name!);
  };

  const sendSignal = (signal: RemoAPI.Signal) => {
    Api.SendSignal(signal.id!);
  };

  const sendAirconSettings = async (data: { temperature?: string, operation_mode?: string, air_volume?: string, air_direction?: string, button?: string }) => {
    const new_settings = await Api.SendAirconSettings(params.id, data);
    const tmp = appliance();
    if (tmp) {
      const updated = { ...tmp, settings: new_settings };
      updateAppliance(params.id, updated);
    }
  };

  return (
    <Switch fallback={<div>Wrong data!!</div>}>
      <Match when={appliance()?.type === "LIGHT"}>
        <ButtonsLight appliance={appliance()!} onSignalClick={sendSignal} onButtonClick={sendLightButton} />
      </Match>
      <Match when={appliance()?.type === "IR"}>
        <ButtonsIR appliance={appliance()!} onSignalClick={sendSignal} />
      </Match>
      <Match when={appliance()?.type === "TV"}>
        <ButtonsTV appliance={appliance()!} onSignalClick={sendSignal} onButtonClick={sendTVButton} />
      </Match>
      <Match when={appliance()?.type === "AC"}>
        <ButtonsAC appliance={appliance()!} onSignalClick={sendSignal} onChange={sendAirconSettings} />
      </Match>
    </Switch>
  );
}
