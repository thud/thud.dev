<script lang="ts">
    import { writable } from 'svelte/store';
    import colors from '../state/themes';
    import { bufferchrsize, bufferchrpadding } from '../state/buffer';
    import {
        inshell,
        shelltxtrows,
        shelltxtheight,
        lsproj,
    } from '../state/shell';

    export let gi: number;
    let displaytextrows = writable(['']);

    let start: number,
        rowi = 0,
        coli = 0;
    function write(t: number) {
        if (start === undefined) start = t;
        const elapsed = t - start;

        coli += elapsed * 0.001;
        $displaytextrows = $displaytextrows.map((row, i) => {
            if (i == rowi) return shelltxtrows[i].slice(0, Math.round(coli));
            return row;
        });

        if (coli >= shelltxtrows[rowi].length) {
            if (++rowi < shelltxtheight)
                $displaytextrows = [...$displaytextrows, ''];
            coli = 0;
        }
        if (rowi < shelltxtheight) window.requestAnimationFrame(write);
        else $lsproj = true;
    }
    $: if (inshell) window.requestAnimationFrame(write);
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
        fill={$colors.yellow}
        style="text-shadow: 0 0 10px {$colors.yellow}88">
        {r}
    </text>
{/each}
