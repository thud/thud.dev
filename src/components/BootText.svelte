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
	let currowi = 0, lastrowi = 0, boot_speed = 0.002;
    function step(t: number) {
        if (start === undefined) start = t;
        const elapsed = t - start;

		const currowi = Math.round(lastrowi + boot_speed*elapsed);
		const newlines = boot_lines.slice(lastrowi, currowi)
			.map(row => `[${(elapsed / 1000).toFixed(10)}] ${row}`);

		lastrowi = currowi;

        $displaytextrows = [...newlines, ...$displaytextrows].slice(
            0,
            $buffersize[0]
        );
        if (currowi < boot_lines.length) {
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
