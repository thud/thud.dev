import { writable, readable } from 'svelte/store';

export const inshell = writable(false);
export const lsproj = writable(false);
export const lsblog = writable(false);

const shelltxt = `
&&&&&[thud@thud.dev ~]$ &&&l&s&&&p&r&&o&&j&&

`;

export const shelltxtrows = shelltxt['replaceAll'](
    '&',
    '‎'.repeat(Math.random() * 100)
).split('\n');

export const shelltxtheight = shelltxtrows.length;
