import { InfluxDB } from "@influxdata/influxdb-client";
import env from "dotenv";

env.config();
const url = process.env.IP_SERVER;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const client = new InfluxDB({ url, token });

export const queryApi = client.getQueryApi(org);

export const fluxQueryBatteryMin = () => {
    return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: min, createEmpty: false)
            |> yield(name: "min")`;
  };

  export const fluxQueryBatteryMax = () => {
    return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: max, createEmpty: false)
            |> yield(name: "max")`;
  };

  export const fluxQueryBatterySum = () => {
    return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: sum, createEmpty: false)
            |> yield(name: "sum")`;
  };
  
  export const fluxQueryBatteryMean = () => {
    return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
            |> yield(name: "mean")`;
  };
  
  export const fluxQueryBatteryStdDev = () => {
    return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: stddev, createEmpty: false)
            |> yield(name: "stddev")`;
  };
  
  

export const fluxQuery1 = (days) => {
  return `from(bucket: "${bucket}")
            |> range(start: -${days}d)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")`;
};

export const fluxQuery3 = () => {
  return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "solarPanelVoltage")
            |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
            |> yield(name: "mean")`;
};

export const fluxQueryBattery = () => {
  return `from(bucket: "${bucket}")
            |> range(start: -1d, stop: now())
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)
            |> yield(name: "mean")`;
};

export const fluxQueryBatteryStats = () => {
    return `import "influxdata/influxdb/v1"
  
            data = from(bucket: "${bucket}")
                |> range(start: -1d)
                |> filter(fn: (r) => r["_measurement"] == "energy_data")
                |> filter(fn: (r) => r["_field"] == "batteryVoltage")
  
            min = data |> v1.fieldsAsCols() |> min(column: "_value") |> keep(columns: ["_value"])
            max = data |> v1.fieldsAsCols() |> max(column: "_value") |> keep(columns: ["_value"])
            sum = data |> v1.fieldsAsCols() |> sum(column: "_value") |> keep(columns: ["_value"])
            mean = data |> v1.fieldsAsCols() |> mean(column: "_value") |> keep(columns: ["_value"])
            stddev = data |> v1.fieldsAsCols() |> stddev(column: "_value") |> keep(columns: ["_value"])
  
            union(tables: [min, max, sum, mean, stddev])`;
  };
  
  
  

export const fluxQuery2 = (days) => {
  return `from(bucket: "${bucket}")
            |> range(start: -${days}d)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "solarPanelVoltage")`;
};

export const lastEntryQueryS = () => {
  return `from(bucket: "${bucket}")
            |> range(start: -1h)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "solarPanelVoltage")
            |> sort(columns: ["_time"], desc: true)
            |> limit(n: 1)`;
};

export const lastEntryQueryBatteryPercentage = () => {
  return `from(bucket: "${bucket}")
            |> range(start: -1h)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryPercentage")
            |> sort(columns: ["_time"], desc: true)
            |> limit(n: 1)`;
};

export const lastEntryQueryB = () => {
  return `from(bucket: "${bucket}")
            |> range(start: -1h)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> sort(columns: ["_time"], desc: true)
            |> limit(n: 1)`;
};

export const fluxQueryMeanB = (days) => {
  return `from(bucket: "${bucket}")
            |> range(start: -${days}d)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")
            |> aggregateWindow(every: 1d, fn: mean, createEmpty: false)
            |> yield(name: "mean_batteryVoltage")`;
};
