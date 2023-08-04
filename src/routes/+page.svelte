<script>
    import { base } from "$app/paths";
    import CalcTypeSelect from "$components/CalcTypeSelect.svelte";
    import Settings from "$components/Settings/Settings.svelte";
    import OCR from "$components/OCR.svelte";
    let calcType;
    let canvas;
    let base64;
    let stats;
    function handlePaste(e) {
        e.preventDefault();

        let file;
        if (e.clipboardData.types[0] === "Files") {
            file = e.clipboardData.items[0];
        } else if (e.clipboardData.types[1] === "Files") {
            file = e.clipboardData.items[1];
        } else {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file.getAsFile());
        reader.addEventListener("load", async (e) => {
            const image = new Image();
            base64 = e.target.result;

            image.src = base64;
            image.addEventListener("load", () => {
                canvas.width = image.width;
                canvas.height = image.height;
                canvas.getContext("2d").drawImage(image, 0, 0);
            });
        });
    }
</script>

<div on:paste={handlePaste} contenteditable>ここに貼り付け</div>
<canvas bind:this={canvas} width="0" height="0" />

<CalcTypeSelect bind:selected={calcType} />

{#if base64}
    <OCR bind:stats {base64} {calcType} />
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
