<script>
    export let value;
    export let label;
    export let variant;
</script>

<div class="form-control">
    <label class="input-group">
      <span>{label}</span>
      <input bind:value={value} type="text" placeholder="Type here" class="input input-bordered input-{variant} w-full max-w-xs">
    </label>
</div>