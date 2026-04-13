/// <reference path="schema.d.ts" />
import { createSignal } from "solid-js";

const [devices, setDevices] = createSignal<RemoAPI.Device[]>([]);
const [appliances, setAppliances] = createSignal<RemoAPI.Appliance[]>([]);

export { devices, setDevices, appliances, setAppliances };

export function updateAppliance(id: string, appliance: RemoAPI.Appliance) {
  setAppliances((prev) => prev.map((v) => (v.id === id ? appliance : v)));
}
