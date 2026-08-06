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
  export interface Appliance {
    /**
     * Set when type is "EL_SMART_METER".
     */
    smart_meter?: SmartMeter;
  }
}
