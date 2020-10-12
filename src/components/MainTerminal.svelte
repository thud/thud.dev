<script lang="ts">
    import { onMount } from 'svelte';
    import {
        screenWidth,
        screenHeight,
        graphics,
        entirebufferheight,
        totgraphicsheight,
    } from '../state/buffer';
    import { colors } from '../state/themes';
    import { booting } from '../state/boot';
    import { inlogin, logintxtheight } from '../state/login';
    import { lsproj } from '../state/shell';
    import { projects } from '../state/projects';

    import BootText from './BootText.svelte';
    import LoginGraphic from './LoginGraphic.svelte';
    import TextGraphic from './TextGraphic.svelte';
    import ShellGraphic from './ShellGraphic.svelte';
    import ItemGraphic from './ItemGraphic.svelte';

    window.addEventListener('resize', e => {
        $screenWidth = e.currentTarget.innerWidth;
        $screenHeight = e.currentTarget.innerHeight;
    });

    onMount(() => {
        $screenWidth = window.innerWidth;
        $screenHeight = window.innerHeight;
        $entirebufferheight = $screenHeight;
    });
</script>

<style>
    svg {
        width: 100%;
    }

    rect {
        pointer-events: none;
    }
</style>

<svg
    style="background-color:{$colors.bg};text-shadow:0 0 10px {$colors.red}; height: {$entirebufferheight}">
    {#if $booting}
        <BootText />
    {:else}
        <LoginGraphic gi={0} />
        {#if !$inlogin}
            {#each $graphics as g, cgi}
                <TextGraphic {g} gi={cgi + logintxtheight} />
            {/each}
            <ShellGraphic gi={logintxtheight + totgraphicsheight} />
            {#if $lsproj}
                {#each projects as proj, proji}
                    <ItemGraphic
                        {proj}
                        {proji}
                        gi={logintxtheight + totgraphicsheight + 2 + proji * 18} />
                {/each}
            {/if}
        {/if}
    {/if}

    <rect
        style="fill:url(#vignette-grad)"
        x="0"
        y="0"
        width="100%"
        height="100%" />

    <defs>
        <radialGradient
            id="vignette-grad"
            fx="50%"
            fy="50%"
            r="55%"
            spreadMethod="pad">
            <stop offset="0%" stop-color={$colors.bg} stop-opacity="0" />
            <stop offset="70%" stop-color={$colors.bg} stop-opacity="0" />
            <stop offset="100%" stop-color={$colors.bg} stop-opacity="0.25" />
        </radialGradient>
    </defs>
</svg>
