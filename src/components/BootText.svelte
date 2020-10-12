<script lang="ts">
    import { writable } from 'svelte/store';
    import { colors } from '../state/themes';
    import { booting, boot_txt } from '../state/boot';
    import {
        buffersize,
        bufferchrsize,
        bufferchrpadding,
    } from '../state/buffer';

    let displaytextrows = writable([]);
    const boot_lines = boot_txt.split('\n');

    let start: number;
    let rowi = 0;
    function step(t: number) {
        if (start === undefined) start = t;
        const elapsed = t - start;

        const newline = `[${(elapsed / 1000).toFixed(10)}] ${
            boot_lines[rowi]
        }`;
        $displaytextrows = [newline, ...$displaytextrows].slice(
            0,
            $buffersize[0]
        );
        if (++rowi < boot_lines.length) {
            window.requestAnimationFrame(step);
        } else {
            setTimeout(() => {
                $booting = false;
            }, 250);
        }
    }

    $: if (booting) window.requestAnimationFrame(step);
</script>

<style>
    text {
        text-shadow: none;
        white-space: pre-wrap;
    }
</style>

{#each $displaytextrows as row, i}
    <text
        y={($bufferchrsize + $bufferchrpadding) * ($displaytextrows.length - i - 1)}
        fill={$colors.grey}
        style="font-size:{$bufferchrsize}px;">
        {row}
    </text>
{/each}
<!--<text y="40" fill={$colors.fg}>{$displaytext}</text>-->
