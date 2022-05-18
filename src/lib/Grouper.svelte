<script>
    export let show = false;
    export let always = false;
    export let label;
    export let errors = [false];

    function change(){
        if(!always) show=!show
    }

    $: color = errors.some(x => x) ? "warning": "info"
</script>

<div class="mb-2 mt-2 w-full grid grid-cols-1 place-items-center">
    <button class={`btn btn-${color} md:w-full w-1/3`} on:click={change}>{label}</button>
    {#if show}
        <slot />
    {/if}
</div>