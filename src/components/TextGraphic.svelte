<script lang="ts">
    import { writable } from 'svelte/store';
    import colors from '../state/themes';
    import {
        screenWidth,
        buffersize,
        bufferchrsize,
        bufferchrpadding,
    } from '../state/buffer';
    import type Graphic from '../model/Graphic';

    export let g: Graphic;
    export let gi: number;
    let msr = g.mainstringrows;
    let displaytextrows = writable([]);
    let rowspeeds = [];
    let rowdists = [];

    let start: number;
    let rowi = 0;
    function fadein(t: number) {
        if (start === undefined) start = t;
        const elapsed = t - start;
        let nothingtodo = true;

        if (rowi < msr.length) {
            $displaytextrows = [...$displaytextrows, ''].slice(
                0,
                $buffersize[0]
            );
            rowspeeds.push(Math.random() * 0.001 + 0.001 / (rowi + 1));
            rowdists.push(0);
            nothingtodo = false;
            rowi++;
        }

        $displaytextrows = $displaytextrows.map((_row, i) => {
            const mxlen = msr[i].length;
            nothingtodo = false;
            rowdists[i] += elapsed * rowspeeds[i];
            return msr[i].slice(0, Math.min(mxlen, Math.floor(rowdists[i])));
        });

        if (!nothingtodo) window.requestAnimationFrame(fadein);
    }

    window.requestAnimationFrame(fadein);

    const txtwidth = $bufferchrsize * msr[0].length;
    let textx = writable(msr[0].length);

    let lt: number;
    function marquee(t: number) {
        if (lt === undefined) lt = t;
        const dt = t - lt;
        lt = t;

        $textx += dt * g.marqueespeed * 0.001;

        window.requestAnimationFrame(marquee);
    }

    if (g.marqueespeed > 0) window.requestAnimationFrame(marquee);

    $: x1 = (($textx * $bufferchrsize) % ($screenWidth + txtwidth)) - txtwidth;
</script>

<style>
    text {
        white-space: pre;
    }
</style>

{#each $displaytextrows as r, i}
    <text
        x={x1}
        y={(gi + i + 1) * ($bufferchrsize + $bufferchrpadding)}
        fill={$colors.red}>
        {r}
    </text>
{/each}
