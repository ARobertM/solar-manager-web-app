import { InfluxDB } from "@influxdata/influxdb-client";
import env from 'dotenv';

env.config();
const url = process.env.IP_SERVER;
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const client = new InfluxDB({url, token});

export const queryApi = client.getQueryApi(org);

export const fluxQuery1 = (days) => {
    return `from(bucket: "${bucket}")
            |> range(start: -${days}d)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "batteryVoltage")`;  
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
}


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

