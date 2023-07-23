<script>
    import { calcTypes } from "./store.js";
    export let selected;
</script>

<select bind:value={selected}>
    {#each $calcTypes as calcType}
        <option value={calcType}>{calcType.label}</option>
    {/each}
</select>

<style>
    select {
        background: #1f2937;
    }
</style>
