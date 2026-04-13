import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { devices, appliances } from '../store';
import { updateAppliance } from '../store';
import Api from '../Api';
import Device from '../components/Device';
import Appliance from '../components/Appliance';

export default function Top() {
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');
  if (!token) {
    navigate('/config');
  }

  return (
    <For each={devices()}>
      {(device: RemoAPI.Device) => (
        <Device device={device}>
          <For each={appliances().filter((a) => a.device!.id === device.id)}>
            {(a: RemoAPI.Appliance) => (
              <Appliance
                data={a}
                onClick={() => navigate('/appliances/' + a.id)}
                onPowerClick={async () => {
                  if (a.type === 'LIGHT') {
                    const newState = await Api.SendLightButton(a.id!, a.light!.state!.power === 'on' ? 'off' : 'on');
                    const updated = { ...a, light: { ...a.light!, state: newState } };
                    updateAppliance(a.id!, updated);
                  } else if (a.type === 'AC') {
                    const newSettings = await Api.SendAirconSettings(a.id!, {button: a.settings!.button === 'power-off' ? '' : 'power-off'});
                    const updated = { ...a, settings: newSettings };
                    updateAppliance(a.id!, updated);
                  }
                }}
              />
            )}
          </For>
        </Device>
      )}
    </For>
  );
}
