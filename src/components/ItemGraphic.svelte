<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { colors } from '../state/themes';
    import {
        bufferchrsize,
        bufferchrpadding,
        screenWidth,
        entirebufferheight,
    } from '../state/buffer';
    import type Project from '../model/Project';

    export let gi: number;

    export let proj: Project;
    export let proji: number;
    $: x1 = $bufferchrpadding;
    $: y1 = ($bufferchrsize + $bufferchrpadding) * (gi + 1);

	const indelay = 500 + 500 * proji;
	
    onMount(() => {
		setTimeout(() => {
			$entirebufferheight = Math.max(
				$entirebufferheight,
				y1 + 300 + $bufferchrpadding
			);
		}, indelay);
    });

</script>

<style>
    .item {
        pointer-events: all;
        transition: opacity 0.4s ease-in-out;
        transition: transform 0.4s ease-in-out;
    }

    .item rect {
        opacity: 0.1;
    }

    .item:hover {
        transform: translateY(-5px);
        cursor: pointer;
    }

    .item:hover rect {
        opacity: 0.15;
    }

    image {
        opacity: 0.6;
    }

    a {
        text-decoration: none;
    }
</style>

<g class="item" in:fade={{ delay: 500 + proji * 500 }}>
    <a href={proj.linkurl}>
        <clipPath id="imgclip{gi}">
            <rect
                fill={$colors.grey}
                x={x1}
                y={y1}
                rx={8}
                ry={8}
                width={Math.max(0, Math.min(1000, $screenWidth - 2 * $bufferchrpadding))}
                height="300" />
            <circle cx="40" cy="35" r="35" />
        </clipPath>
        {#if proj.bgimgurl[0] !== '#'}
            <image
                xlink:href={proj.bgimgurl}
                x={x1 - 500 + 0.5 * Math.min($screenWidth - 2 * $bufferchrpadding - 40, 1000)}
                y={y1 - 80}
                clip-path="url(#imgclip{gi})"
                width={1000}
                style="opacity: {proj.bgimgop}" />
        {:else}
            <rect
                fill={proj.bgimgurl}
                x={x1}
                y={y1}
                rx={8}
                ry={8}
                width={Math.max(0, Math.min(1000, $screenWidth - 2 * $bufferchrpadding))}
                height="300" />
        {/if}
        <rect
            fill={$colors.grey}
            x={x1}
            y={y1}
            rx={8}
            ry={8}
            width={Math.max(0, Math.min(1000, $screenWidth - 2 * $bufferchrpadding))}
            height="300" />
        <text
            x={x1 + 20}
            y={y1 + 180}
            fill={$colors.fg}
            style="font-family: '{proj.fontfam}' 'Fira Code' sans-serif; font-size: {Math.min(($screenWidth / proj.title.length) * 1.3, proj.fontsz)}px; font-weight: bold; text-shadow: 0 0 10px {$colors.fg}55;">
            {proj.title}
        </text>
    </a>
</g>
