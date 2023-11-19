

import path from "path";
import fs from "fs";
import isObjectLiteral from "./is-object-literal.mjs";

//const logger = (await import("./logger-console.mjs"))({module});
const logger = {warn: console.warn};

/**
 * Attempts to read a config file and returns the content.
 * If .json extension the content returned is parsed.
 * If attempt fails returns undefined.
 * 
 * @example
 * //One liner with a default empty object.
 * const { token } = (await import("../utils/config-get.mjs")).default("./config/discord.json", {});
 * 
 * //Handle missing configs
 * if (!token) {
 *  throw new Error('A discord.json file containing a token is required.');
 * }
 * 
 * @example
 * //Two liner with a default empty object.
 * import configGet from './utils/config-get.mjs'
 * const config = configGet('./config/discord.json', {});
 * 
 * 
 * @param {String} file - Path to the config file.
 * @param {any} [defaultVal=undefined] - Default value sent if anything fails.
 * @param {boolean} [allowJsonFails=true] - If false JSON parse fails will throw instead of returning default.
 * @returns {Object, any}
 */
export default function configGet (file, defaultVal = undefined, allowJsonFails = true) {
    const {ext} = path.parse(file);
    let data;

    try {
        data = fs.readFileSync(file);
    } catch(err) {
        if (err?.message?.startsWith("ENOENT")) {
            logger.warn("configGet() file does not exist: "+ path.resolve(file));
            return defaultVal;
        }
        logger.warn(err);
        return defaultVal;
    }

    if (ext.toLowerCase() != '.json') {
        return data;
    }

    try {
        data = JSON.parse(data);
        if (isObjectLiteral(data) && isObjectLiteral(defaultVal)) {
            return {... defaultVal, ...data};
        }
        return data;
    } catch(err) {
        if (allowJsonFails) {
            return defaultVal;
        }
        throw err;
    }
}



