import { InfluxDB } from "@influxdata/influxdb-client";
import env from 'dotenv';

env.config();
const url = "http://192.168.0.101:8086";
const token = process.env.INFLUX_TOKEN;
const org = process.env.INFLUX_ORG;
const bucket = process.env.INFLUX_BUCKET;

const client = new InfluxDB({url, token});

export const queryApi = client.getQueryApi(org);

export const fluxQuery = (days) => {
    return `from(bucket: "${bucket}")
            |> range(start: -${days}d)
            |> filter(fn: (r) => r["_measurement"] == "energy_data")
            |> filter(fn: (r) => r["_field"] == "solarPanelVoltage" or r["_field"] == "batteryVoltage")`
};