import folderImport from "./utils/folder-import.mjs";
import { getGlobals } from 'common-es';
import fs from 'fs';
const { __dirname, __filename } = getGlobals(import.meta.url);

const routes = folderImport(fs.parse(__dirname, '/routes'));


export default function router ({wss, ws, data}) {
    try {
        data = JSON.parse(data);
        if ( !isObject(data)) {
            return;
        }
    } catch (err) {
        console.error(err);
    }
    
}


/**
 * Check if a type is an object and not an array, function, or null.
 * @param {*} obj 
 * @returns {boolean}
 */
function isObject(obj) {
    let type = typeof obj;
    return !Array.isArray(obj) && type !== 'function' && type === 'object' && !!obj;
  };