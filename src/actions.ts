/// <reference path="schema.d.ts" />
import actionCreateFactory from 'typescript-fsa';

const creator = actionCreateFactory();

export const actions = {
  updateDevices: creator<Array<RemoAPI.Device>>('ACTIONS_UPDATE_DEVICES'),
  updateAppliances: creator<Array<RemoAPI.Appliance>>('ACTIONS_UPDATE_APPLIANCES'),
  updateAppliance: creator<{ id: string, appliance: RemoAPI.Appliance }>('ACTIONS_UPDATE_APPLIANCE'),
  updateRemains: creator<number>('ACTIONS_UPDATE_REMAINS'),
};
