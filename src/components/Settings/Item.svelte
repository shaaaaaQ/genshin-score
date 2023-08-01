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

<div class="bg-gray-700 my-1 p-1 rounded-lg flex">
    <div class="w-[150px] p-[2px]">{props[propId]}</div>
    <input
        class="bg-gray-600 w-[40px] rounded-[5px] text-end p-[2px]"
        on:input
        on:keydown={(e) => e.key === "Enter" && e.preventDefault()}
        {value}
        contenteditable
    />
    <button class="material-icons ml-1" on:click>remove</button>
</div>
