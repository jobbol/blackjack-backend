export const type = 'route';
export const name = 'join';

export const execute = function ({data, arr}) {
    console.log(arr.join(' '));
}
