<script>
    import { calcTypes } from "../store.js";
    import Item from "./Item.svelte";
    export let label;
    export let rates;
    export let index;
    const props = {
        FIGHT_PROP_CRITICAL: "会心率",
        FIGHT_PROP_CRITICAL_HURT: "会心ダメージ",
        FIGHT_PROP_ATTACK: "攻撃力",
        FIGHT_PROP_HP: "HP",
        FIGHT_PROP_DEFENSE: "防御力",
        FIGHT_PROP_ATTACK_PERCENT: "攻撃力%",
        FIGHT_PROP_HP_PERCENT: "HP%",
        FIGHT_PROP_DEFENSE_PERCENT: "防御力%",
        FIGHT_PROP_CHARGE_EFFICIENCY: "元素チャージ効率",
        FIGHT_PROP_ELEMENT_MASTERY: "元素熟知",
    };
    let selected;
    $: selectable = Object.keys(props).filter(
        (p) => !Object.keys(rates).includes(p)
    );
</script>

<div class="table">
    <div class="head">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="label"
            on:input={(e) => {
                const value = e.target.textContent;
                calcTypes.updateLabel(index, value);
            }}
            on:keydown={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
            contenteditable
        >
            {label}
        </div>
        <button
            class="delete-button material-icons"
            on:click={() => calcTypes.rm(index)}
        >
            delete
        </button>
    </div>
    <div class="item-container">
        {#each Object.entries(rates) as [propId, rate]}
            <Item
                on:input={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value))
                        calcTypes.updateProp(index, propId, value);
                }}
                on:click={() => calcTypes.rm(index, propId)}
                value={rate}
                {propId}
            />
        {/each}
    </div>
    <div class="foot">
        <select class="prop-select" bind:value={selected}>
            <option hidden />
            {#each selectable as propId}
                <option value={propId}>{props[propId]}</option>
            {/each}
        </select>
        <button
            class="push-button material-icons"
            on:click={() =>
                selected && calcTypes.updateProp(index, selected, 1)}
        >
            add
        </button>
    </div>
</div>

<style>
    .table {
        margin: 10px;
        border-radius: 15px;
        background: #1f2937;
        padding: 10px;
    }
    .label {
        width: 194px;
    }
    .head {
        padding: 5px;
        display: flex;
    }
    .foot {
        padding: 5px 5px 5px 0;
        display: flex;
    }
    .prop-select:focus-visible {
        outline: none;
    }
    .delete-button,
    .push-button {
        margin-left: 4px;
        width: 26px;
        text-align: center;
        background: #1f2937;
        border: none;
        padding: 0;
    }
    .prop-select {
        background: #374151;
        border: none;
        border-radius: 8px;
        width: 199px;
    }
</style>
