import { readable, writable, derived, get } from 'svelte/store';
import Graphic from '../model/Graphic';

export const screenWidth = writable(0);
export const screenHeight = writable(0);
export const bufferchrsize = readable(10, undefined);
export const bufferchrpadding = readable(8, undefined);
export const buffersize = derived(
    [screenWidth, screenHeight, bufferchrsize, bufferchrpadding],
    ([sw, sh, bcs, bcp]) => [
        Math.ceil(sh / (bcs + bcp)),
        //Math.floor(sw / (bcs + bcp)),
        Math.ceil(sw / (bcs * 0.6)),
    ]
);

export const entirebufferheight = writable(0);

export const graphics = writable([
    new Graphic(
        `   /$$     /$$                       /$$           /$$                            
  | $$    | $$                      | $$          | $$                            
 /$$$$$$  | $$$$$$$  /$$   /$$  /$$$$$$$      /$$$$$$$  /$$$$$$  /$$    /$$       
|_  $$_/  | $$__  $$| $$  | $$ /$$__  $$     /$$__  $$ /$$__  $$|  $$  /$$/       
  | $$    | $$  \\ $$| $$  | $$| $$  | $$    | $$  | $$| $$$$$$$$ \\  $$/$$/        
  | $$ /$$| $$  | $$| $$  | $$| $$  | $$    | $$  | $$| $$_____/  \\  $$$/         
  |  $$$$/| $$  | $$|  $$$$$$/|  $$$$$$$/$$ |  $$$$$$$|  $$$$$$$   \\  $/          
   \\___/  |__/  |__/ \\______/  \\_______/|__/\\_______/ \\_______/     \\_/           `.split(
            '\n'
        ),
        true,
        4
    ),
]);

export const totgraphicsheight = get(graphics).reduce(
    (a, b) => a + b.mainstringrows.length,
    0
);
