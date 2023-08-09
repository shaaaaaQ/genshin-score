<script>
    import { createEventDispatcher } from "svelte";
    import Cropper from "svelte-easy-crop";
    export let originalFile;
    export let closeModal;
    const dispatch = createEventDispatcher();
    let area;
</script>

<div class="bg-black/20 w-full h-full flex absolute top-0 left-0">
    <div class="bg-gray-800 m-auto w-[50rem] p-3 rounded-3xl">
        <div class="flex justify-end">
            <button class="material-icons" on:click={closeModal}>close</button>
        </div>
        <div class="w-full h-[25rem] my-2 relative">
            <Cropper
                image={URL.createObjectURL(originalFile)}
                maxZoom="10"
                aspect={5 / 3}
                on:cropcomplete={(e) => (area = e.detail.pixels)}
            />
        </div>
        <div class="flex justify-end gap-2">
            <button
                class="bg-gray-700 p-2 rounded-md"
                on:click={() => {
                    dispatch("crop", { blob: originalFile });
                    closeModal();
                }}>元の画像を選択</button
            >
            <button
                class="bg-gray-700 p-2 rounded-md"
                on:click={() => {
                    const image = new Image();
                    image.src = URL.createObjectURL(originalFile);
                    image.addEventListener("load", () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = area.width;
                        canvas.height = area.height;
                        canvas
                            .getContext("2d")
                            .drawImage(
                                image,
                                area.x,
                                area.y,
                                area.width,
                                area.height,
                                0,
                                0,
                                area.width,
                                area.height
                            );
                        canvas.toBlob((blob) => dispatch("crop", { blob }));
                    });
                    closeModal();
                }}>選択</button
            >
        </div>
    </div>
</div>
