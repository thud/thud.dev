<script lang="ts">
    import { writable } from 'svelte/store';
    import colors from '../state/themes';
    import {
        bufferchrsize,
        bufferchrpadding,
    } from '../state/buffer';
    import { inlogin, logintxtrows, logintxtheight } from '../state/login';

    export let gi: number;
    let displaytextrows = writable(['']);

    let start: number,
        rowi = 0,
        coli = 0;
    function write(t:number) {
        if (start === undefined) start = t;
        const elapsed = t - start;

        coli += elapsed * 0.001;
        $displaytextrows = $displaytextrows.map((row, i) => {
            if (i == rowi) return logintxtrows[i].slice(0, Math.round(coli));
            return row;
        });

        if (coli >= logintxtrows[rowi].length) {
            if (++rowi < logintxtheight)
                $displaytextrows = [...$displaytextrows, ''];
            coli = 0;
        }
        if (rowi < logintxtheight) window.requestAnimationFrame(write);
        else $inlogin = false;
    }

    $: if ($inlogin) window.requestAnimationFrame(write);
</script>

<style>
    text {
        white-space: pre-wrap;
    }
</style>

{#each $displaytextrows as r, i}
    <text
        x={$bufferchrpadding}
        y={(gi + i + 1) * ($bufferchrsize + $bufferchrpadding)}
        fill={$colors.fg}
        style="text-shadow: 0 0 10px {$colors.fg}88;">
        {r}
    </text>
{/each}
