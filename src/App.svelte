<script lang="ts">
    import { colors } from './state/themes';
    import MainTerminal from './components/MainTerminal.svelte';
</script>

<style>
    main {
        width: 100%;
        height: 100%;
    }
</style>

<main style="background-color:{$colors.bg}">
    <MainTerminal />
</main>
