<script>
    import Tesseract from "tesseract.js";
    import Result from "$components/Result.svelte";
    export let file;
    let status;
    let progress = 0;
    $: proc = (async () => {
        const worker = await Tesseract.createWorker({
            logger: (msg) => {
                status = msg.status;
                progress = msg.progress;
            },
        });

        await worker.loadLanguage("jpn");
        await worker.initialize("jpn");
        const {
            data: { text },
        } = await worker.recognize(file);
        await worker.terminate();

        console.log(text);

        const stats = [];

        text.replace(/ /g, "")
            .split("\n")
            .filter((str) => str.startsWith("・"))
            .forEach((str) => {
                str = str
                    .slice(1)
                    .replace(/⓪/g, "0")
                    .replace(/①/g, "1")
                    .replace(/②/g, "2")
                    .replace(/③/g, "3")
                    .replace(/④/g, "4")
                    .replace(/⑤/g, "5")
                    .replace(/⑥/g, "6")
                    .replace(/⑦/g, "7")
                    .replace(/⑧/g, "8")
                    .replace(/⑨/g, "9")
                    .replace(/カ/g, "力")
                    .replace(/%6/g, "%");
                if (/\.[0-9]9%/.test(str)) {
                    str = `${str.slice(0, -2)}%`;
                }
                stats.push(str);
            });

        return stats;
    })();
</script>

<div class="w-fit mx-auto">
    {#await proc}
        <div>
            {status}
            <progress value={progress} />
        </div>
    {:then stats}
        <Result {stats} />
    {/await}
</div>
