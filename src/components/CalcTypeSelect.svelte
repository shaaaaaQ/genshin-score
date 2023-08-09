<script>
    import { calcTypes } from "$lib/store.js";
    export let selected;
</script>

<select class="bg-gray-700" bind:value={selected}>
    {#each $calcTypes as calcType}
        <option value={calcType}>{calcType.label}</option>
    {/each}
</select>
