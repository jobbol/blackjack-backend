import { generateSlug  } from "random-word-slugs";

/**
 * Uses generateSlug to create new adjective-adjective-noun slug IDs, and avoids collision with existing IDs.  
 * @param {object} global - The global object passed around the whole program.
 * @param {object[]} global.users - Array of user objects.
 * @param {object[]} global.games - Array of game objects.
 * @returns {string} Either a slug ID or the current UNIX timestamp as a fallback.
 * @example 
 * export default function ({global}) {
 *  generateID(global); // => breezy-zealous-sugar
 * }
 */
export default function generateID (global) {
    let out;
    for(let i = 0, collision = true; collision; i++) {

        //Try to get a unique slug type.
        out = generateSlug();
        collision = global.users.some(user => user.id === out) ||
            global.games.some(game => game.id === out);

        //If we loop too many times, fallback to Date.now() as an ID.
        if (i > 10) {
            return Date.now().toString();
        }
    } while(collision);
    return out;
}