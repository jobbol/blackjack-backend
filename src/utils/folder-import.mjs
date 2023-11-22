import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';


/**
 * Imports an entire folder of modules.  Shallow only.  Does not search folders within the given folder.
 * 
 * @typedef {object}  fileImportObj
 * @property {string} full - Absolute path + filename + ext.
 * @property {...any} exports - All exports from the file are spread into this output.
 * 
 * @param {string} folderPath - Path to the folder to import
 * @param {{string | string[]}} ignoreFiles - filenames to exclude.  Uses partial matching.  'card' will exclude 'card-reader.mjs'.
 * @returns {Promise<fileImportObj[]>}
 */
export default async function folderImport (folderPath, ignoreFiles = []) {
    let modules = [];

    if (typeof ignoreFiles === 'string') {
        ignoreFiles = [ignoreFiles];
    }

    const files = await fs.readdir(folderPath);
    
    for (const file of files) {
        if (ignoreFiles.some(ignoreFile => file.match(ignoreFile))) {
            continue;
        }
        const full = path.resolve(folderPath, file);
        const fileUrl = pathToFileURL(full);
        const module = await import(fileUrl.toString());
        modules.push({...module, full});
    }
    
    return modules;
}

