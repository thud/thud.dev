import { writable, readable } from 'svelte/store';

export const inlogin = writable(true);

const logintxt: string = `
Arch Linux 7.0.11-arch1-1 (tty1)

core login: &&t&h&u&&d&&
Password: &&&&&&&
Last Login: Sat Oct 10 12:59:22 on tty1
`;

export const logintxtrows = logintxt['replaceAll'](
    '&',
    '‎'.repeat(Math.random() * 50 + 50)
).split('\n');

export const logintxtheight = logintxtrows.length;
