<script>
    let show = false;
    export let label;
</script>

<div>
    <button on:click={()=>show=!show}>{label}</button>
    {#if show}
        <slot />
    {/if}
</div>