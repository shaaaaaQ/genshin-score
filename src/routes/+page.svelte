<script>
    import { base } from "$app/paths";
    import Settings from "$components/Settings.svelte";
    import OCR from "$components/OCR.svelte";
    import CropModal from "$components/CropModal.svelte";
    let file;
    let originalFile;
    let stats;
    let showCropModal;
</script>

{#if showCropModal}
    <CropModal
        on:crop={(e) => (file = e.detail.blob)}
        closeModal={() => (showCropModal = false)}
        {originalFile}
    />
{/if}

<div class="flex justify-center gap-3 m-3">
    <div
        class="border-gray-500 border-dashed border-4 focus:border-gray-400 focus-visible:outline-none rounded-md w-fit p-2"
        on:paste|preventDefault={(e) => {
            if (e.clipboardData.types[0] === "Files") {
                file = e.clipboardData.items[0].getAsFile();
            } else if (e.clipboardData.types[1] === "Files") {
                file = e.clipboardData.items[1].getAsFile();
            }
        }}
        contenteditable
    >
        ここに貼り付け
    </div>
    <label class="bg-gray-700 rounded-md p-2">
        <input
            type="file"
            class="hidden"
            accept="image/*"
            on:change={(e) => {
                originalFile = e.target.files[0];
                showCropModal = true;
            }}
            on:click={(e) => (e.target.value = "")}
        />ファイルを選択
    </label>
</div>

{#if file}
    <img class="p-2 mx-auto" src={URL.createObjectURL(file)} alt="" />
    <OCR bind:stats {file} />
{/if}

<details>
    <summary>設定</summary>
    <Settings />
</details>

<details>
    <summary>使い方</summary>
    <a href="{base}/images/kore.png" target="_blank">これ</a>をWindowsなら<code
        >Win+Shift+S</code
    >とかで<a href="{base}/images/konnna.png" target="_blank">こんな</a
    >感じに切り取って上のやつに貼り付ける
</details>

<a href="https://github.com/naptha/tesseract.js" target="_blank">tesseract.js</a
>
(<a
    href="https://github.com/naptha/tesseract.js/blob/master/LICENSE.md"
    target="_blank">LICENSE</a
>)

<style lang="postcss">
    :global(*) {
        color: theme(colors.gray.100);
    }
    :global(html) {
        background: theme(colors.gray.900);
    }
    :global(a) {
        color: theme(colors.sky.500);
    }
    :global(body) {
        max-width: 50rem;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
        padding: 10px;
    }
</style>
