<script>
    export let stats;
    export let calcType;
    const props = {
        FIGHT_PROP_CRITICAL: "会心率",
        FIGHT_PROP_CRITICAL_HURT: "会心ダメージ",
        FIGHT_PROP_ATTACK: "攻撃力",
        FIGHT_PROP_HP: "HP",
        FIGHT_PROP_DEFENSE: "防御力",
        FIGHT_PROP_ATTACK_PERCENT: "攻撃力",
        FIGHT_PROP_HP_PERCENT: "HP",
        FIGHT_PROP_DEFENSE_PERCENT: "防御力",
        FIGHT_PROP_CHARGE_EFFICIENCY: "元素チャージ効率",
        FIGHT_PROP_ELEMENT_MASTERY: "元素熟知",
    };
    $: score = (() => {
        let score = 0;
        stats.forEach((stat) => {
            const value = parseFloat(stat.split("+")[1]);
            Object.entries(props).forEach(([propId, propName]) => {
                const rate = calcType.rates[propId];
                if (!rate) return;
                if (stat.startsWith(propName)) {
                    if (/ATTACK|DEFENSE|HP/.test(propId)) {
                        if (propId.endsWith("PERCENT") && stat.endsWith("%")) {
                            score += value * rate;
                            return;
                        } else if (
                            !propId.endsWith("PERCENT") &&
                            !stat.endsWith("%")
                        ) {
                            score += value * rate;
                            return;
                        } else return;
                    }
                    score += value * rate;
                    return;
                }
            });
        });
        return Math.round(score * 10) / 10;
    })();
</script>

<table class="bg-gray-700 rounded-md">
    {#each stats as stat}
        <tr>
            <td>
                {stat}
            </td>
        </tr>
    {/each}
    <tr>
        <th class="text-left underline">
            スコア: {score}
        </th>
    </tr>
</table>
