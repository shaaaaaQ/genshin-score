<script>
    import { calcTypes } from "$lib/store.js";
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

<div class="m-2 rounded-2xl bg-gray-800 p-2 h-max">
    <div class="p-1 flex">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="p-[2px] w-[190px]"
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
            class="material-icons ml-auto"
            on:click={() => calcTypes.rm(index)}
        >
            delete
        </button>
    </div>
    {#each Object.entries(rates) as [propId, rate]}
        <Item
            on:input={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) calcTypes.updateProp(index, propId, value);
            }}
            on:click={() => calcTypes.rm(index, propId)}
            value={rate}
            {propId}
        />
    {/each}
    <div class="py-1 pr-1 flex">
        <select class="bg-gray-700 rounded-lg" bind:value={selected}>
            <option hidden />
            {#each selectable as propId}
                <option value={propId}>{props[propId]}</option>
            {/each}
        </select>
        <button
            class="material-icons ml-auto"
            on:click={() =>
                selected && calcTypes.updateProp(index, selected, 1)}
        >
            add
        </button>
    </div>
</div>
