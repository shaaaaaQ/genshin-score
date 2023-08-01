<script>
    import { calcTypes } from "$lib/store.js";
    let label;
</script>

<div class="m-2">
    <input class="bg-gray-700 rounded-md p-1" bind:value={label} />
    <button
        class="bg-gray-800 rounded md p-1 ml-1"
        on:click={() => {
            calcTypes.append(label);
            label = "";
        }}>追加</button
    >
</div>
