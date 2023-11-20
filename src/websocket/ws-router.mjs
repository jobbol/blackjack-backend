import folderImport from "../utils/folder-import.mjs";
import { getGlobals } from 'common-es';
import path from 'path';
import { WebSocketServer } from "ws";

const { __dirname, __filename } = getGlobals(import.meta.url);

const routesPath = path.join(__dirname, './routes');

const routes = await folderImport(routesPath);
verifyFolderImportRoutes(routes);



/**
 * Called by web socket server on incoming message.
 * Passes message down to the proper route by calling that route's execute function.
 * @typedef {object} params
 * @property {object} params.server       - Global object passed down to each route for sharing variables.
 * @property {WebSocketServer} params.wss - Web socket server.
 * @property {WebSocket} params.ws        - Web socket belonging to a client.
 * @property {messageData} params.data    - Data sent from each message.
 * 
 * @typedef {object} messageData  - Data sent from each message.
 * @property {string} routeName - The route to take.
 */
export default function router (params) {

    try {
        //Convert message data to JSON.
        const data = params.data = JSON.parse(params.data);

        //Message must be an object and have .routeName
        if ( !isObject(data) || !data.routeName) {
            return;
        }

        //Find the matching route and execute it.
        let matchRoute = routes.find(route => route.name === data.routeName);
        if (matchRoute) {
            matchRoute.execute({...params, ...params.data});
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



/**
 * Verifies each route is in proper format.
 * @param {fileImportObj[]} imports - Array of imports returned from folderImport();
*/
function verifyFolderImportRoutes (imports) {
    if (!Array.isArray(imports)) {
        throw new Error('verifyFolderImportRoutes() must be passed the outputted array from folderImport().');
    }

    const existingNames = new Map();
    
    imports.forEach((imp) => {
        if (!isObject(imp)) {
            throw new Error('Folder imports must be an array of objects.');
        }

        if (!imp.full) {
            throw new Error(`All folder import objects must have a .full property.`);
        }

        if (typeof imp.execute !== 'function') {
            throw new Error(`All folder import objects must have a .execute property. Check ${imp.full}`);
        }

        if (!imp.type) {
            throw new Error(`All files in ${routesPath} are assumed to be route imports.  ${imp.full} must export const type = 'route';`);
        }

        //Default name to the filename, if not given.
        if (!imp.name) {
            imp.name = path.parse(imp.full).name;
        }

        //Names must be unique.  Ensure it doesn't already exist.
        if (existingNames.has(imp.name)) {
            throw new Error(`All route names must be unique.  Found name of ${imp.name} matching both\n ${existingNames.get(imp.name)} \nAND\n ${imp.full}`);
        }
        existingNames.set(imp.name, imp.full);
    });
}