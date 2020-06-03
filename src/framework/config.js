import config from "../config";

import { has } from "underscore";

export function get(key) {
    if (has(config, key)) {
        return config[key];
    } else {
        throw "Config not found: " + key;
    }
}

export default Config = {
    get
}