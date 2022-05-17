<script>
    let show = false;
    export let label;
    export let errors = [false];

    $: color = errors.some(x => x) ? "warning": "info"
</script>

<div>
    <button class={`btn btn-${color}`} on:click={()=>show=!show}>{label}</button>
    {#if show}
        <slot />
    {/if}
</div>