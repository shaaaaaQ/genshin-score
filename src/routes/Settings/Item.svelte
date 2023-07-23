<script>
    export let propId;
    export let value;
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
</script>

<div class="item">
    <div class="prop-name">{props[propId]}</div>
    <input
        class="rate"
        on:input
        on:keydown={(e) => e.key === "Enter" && e.preventDefault()}
        {value}
        contenteditable
    />
    <button class="remove-button material-icons" on:click>remove</button>
</div>

<style>
    .item {
        background: #374151;
        margin: 5px 0;
        padding: 5px;
        border-radius: 8px;
        display: flex;
    }
    .prop-name {
        width: 150px;
    }
    .rate {
        background: #4b5563;
        width: 40px;
        border: none;
        border-radius: 5px;
        text-align: end;
        padding: 2px;
    }
    .rate:focus-visible {
        outline: none;
    }
    .remove-button {
        margin-left: 4px;
        width: 26px;
        text-align: center;
        background: #374151;
        border: none;
        padding: 0;
    }
</style>
