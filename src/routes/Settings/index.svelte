<script>
    import Form from "./Form.svelte";
    import Table from "./Table.svelte";
    import { calcTypes } from "../store.js";
</script>

<div>
    {#each $calcTypes as { label, rates }, index}
        <Table {label} {rates} {index} />
    {/each}
</div>

<Form />

<style>
    div {
        display: flex;
        flex-wrap: wrap;
    }
</style>
