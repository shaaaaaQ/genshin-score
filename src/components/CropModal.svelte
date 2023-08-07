<script>
    export let show = true;
</script>

{#if show}
    <div class="bg-black/20 w-full h-full flex absolute top-0 left-0">
        <div class="bg-gray-800 m-auto w-[50rem] p-3 rounded-3xl">
            <div class="flex justify-end">
                <button class="material-icons" on:click={() => (show = false)}
                    >close</button
                >
            </div>
            <div class="bg-gray-700 w-full h-[25rem] my-2">hoge</div>
            <div class="flex">
                <button>選択</button>
                <button>リセット</button>
            </div>
        </div>
    </div>
{/if}
