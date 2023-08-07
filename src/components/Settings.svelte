<script>
    import Form from "./Settings/Form.svelte";
    import Table from "./Settings/Table.svelte";
    import { calcTypes } from "$lib/store.js";
</script>

<div class="flex flex-wrap">
    {#each $calcTypes as { label, rates }, index}
        <Table {label} {rates} {index} />
    {/each}
</div>

<Form />
