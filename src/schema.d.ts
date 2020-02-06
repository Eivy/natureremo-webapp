/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

declare namespace RemoAPI {
  export interface User {
    id?: string;
    nickname?: string;
  }
  export interface TVState {
    input?: 't' | 'bs' | 'cs';
  }
  export interface TV {
    state?: TVState;
    buttons?: Button[];
  }
  export interface Signal {
    id?: string;
    name?: string;
    image?: string;
  }
  export interface SensorValue {
    val?: number;
    created_at?: string;
  }
  export interface LIGHTState {
    brightness?: string;
    power?: 'on' | 'off';
    last_button?: string;
  }
  export interface LIGHT {
    state?: LIGHTState;
    buttons?: Button[];
  }
  export interface DeviceCore {
    id?: string;
    name?: string;
    temperature_offset?: number;
    humidity_offset?: number;
    created_at?: string;
    updated_at?: string;
    firmware_version?: string;
    mac_address?: string;
    serial_number?: string;
  }
  export interface Device {
    id?: string;
    name?: string;
    temperature_offset?: number;
    humidity_offset?: number;
    created_at?: string;
    updated_at?: string;
    firmware_version?: string;
    mac_address?: string;
    serial_number?: string;
    newest_events?: DeviceNewestEvents;
  }
  export interface DeviceNewestEvents {
    te?: SensorValue;
    hu?: SensorValue;
    il?: SensorValue;
    mo?: SensorValue;
  }
  export interface Button {
    /**
     * Name of button. It is used for "POST /1/{applaince}/tv" and "POST /1/{appliance}/light".
     */
    name?: string;
    image?: string;
    /**
     * Label of button.
     */
    label?: string;
  }
  export interface ApplianceModelAndParam {
    model?: ApplianceModel;
    params?: AirConParams;
  }
  export interface ApplianceModel {
    id?: string;
    manufacturer?: string;
    remote_name?: string;
    name?: string;
    image?: string;
  }
  export interface Appliance {
    id?: string;
    device?: DeviceCore;
    model?: ApplianceModel;
    nickname?: string;
    image?: string;
    type?: string;
    settings?: AirConParams;
    aircon?: AirCon;
    signals?: Signal[];
    tv?: TV;
    light?: LIGHT;
  }
  export interface AirConRangeMode {
    temp?: string[];
    vol?: string[];
    dir?: string[];
  }
  export interface AirConParams {
    temp?: string;
    mode?: string;
    vol?: string;
    dir?: string;
    button?: string;
  }
  export interface AirCon {
    range?: AirConRange;
    tempUnit?: '' | 'c' | 'f';
  }
  export interface AirConRange {
    modes?: AirConRangeModes;
    fixedButtons?: string[];
  }
  export interface AirConRangeModes {
    cool?: AirConRangeMode;
    warm?: AirConRangeMode;
    dry?: AirConRangeMode;
    blow?: AirConRangeMode;
    auto?: AirConRangeMode;
  }
}
