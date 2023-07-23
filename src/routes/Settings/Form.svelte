<script>
    import { calcTypes } from "../store.js";
    let label;
</script>

<div>
    <input bind:value={label} />
    <button
        on:click={() => {
            calcTypes.append(label);
            label = "";
        }}>追加</button
    >
</div>

<style>
    div {
        margin: 10px;
        display: flex;
    }
    input {
        background: #374151;
        border: none;
        border-radius: 5px;
        padding: 2px;
    }
    input:focus-visible {
        outline: none;
    }
    button {
        background: #1f2937;
        border: none;
        margin-left: 5px;
    }
</style>
