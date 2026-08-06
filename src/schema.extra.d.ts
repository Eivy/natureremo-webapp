/**
 * Types which are not covered by the generated schema.d.ts.
 * schema.d.ts was generated from an older swagger definition which only knew
 * about the "AC" / "TV" / "LIGHT" / "IR" appliances. The current Cloud API
 * (https://swagger.nature.global) returns more appliance types, and each of
 * them carries its own field on the appliance object.
 */

declare namespace RemoAPI {
  export interface EchonetLiteProperty {
    /**
     * ECHONET Lite property name. ex: "measured_instantaneous"
     */
    name?: string;
    /**
     * ECHONET Lite property code. ex: 231 (0xE7)
     */
    epc?: number;
    val?: string;
    updated_at?: string;
  }
  export interface SmartMeter {
    echonetlite_properties?: EchonetLiteProperty[];
  }
  /**
   * A macro registered for a BLE appliance. BLE appliances have no dedicated
   * endpoint, they are controlled by executing one of their macros.
   */
  export interface BLEPrivateMacro {
    id?: string;
    url?: string;
  }
  export interface BLE {
    addr?: string;
    addr_type?: string;
    bonded?: boolean;
    /**
     * Macros of the appliance, keyed by name. ex: {"lock": {...}}
     */
    macros?: { [name: string]: BLEPrivateMacro };
  }
  export interface QrioLockDevice {
    id?: number;
    name?: string;
    image?: string;
  }
  export interface QrioLock {
    device?: QrioLockDevice;
    bd_address?: string;
    sub_bd_address?: string;
    is_available?: boolean;
  }
  export interface MorninPlusDevice {
    id?: string;
    name?: string;
    image?: string;
    active?: boolean;
  }
  export interface MorninPlus {
    devices?: MorninPlusDevice[];
    hi_speed_mode?: boolean;
  }
  export interface Appliance {
    /**
     * Set when type is "EL_SMART_METER".
     */
    smart_meter?: SmartMeter;
    /**
     * Set for appliances which are controlled over BLE.
     */
    ble?: BLE;
    qrio_lock?: QrioLock;
    mornin_plus?: MorninPlus;
  }
}
