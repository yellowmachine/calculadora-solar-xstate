<script>
    let show = false;
    export let label;
    export let errors = [false];

    $: color = errors.some(x => x) ? "warning": "info"
</script>

<div class="mb-2 mt-2 w-full grid grid-cols-1 place-items-center">
    <button class={`btn btn-${color} w-80`} on:click={()=>show=!show}>{label}</button>
    {#if show}
        <slot />
    {/if}
</div>