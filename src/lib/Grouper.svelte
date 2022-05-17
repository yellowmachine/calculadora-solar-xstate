<script>
    let show = false;
    export let label;
</script>

<div>
    <button class="btn btn-info" on:click={()=>show=!show}>{label}</button>
    {#if show}
        <slot />
    {/if}
</div>