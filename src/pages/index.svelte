<script>  
  import Mapa from '../lib/Mapa.svelte'
  import Input from '../lib/Input.svelte'
  import data from '../lib/form.js'

  let latlng={lat: $data.lat, lng: $data.lng}

  function isLatitude(v){
    return -90.0 <= v && v <= 90.0
  }

  function isLongitude(v){
    return -180.0 <= v && v <= 180.0
  }

  function handleGo(){
    if(isLatitude($data.lat) && isLongitude($data.lng))
      latlng = {lat: $data.lat, lng: $data.lng}
  }

  $: $data.lat = latlng.lat
  $: $data.lng = latlng.lng
  
</script>

<button on:click={handleGo} class="btn btn-warning" disabled={!isLatitude($data.lat) || !isLongitude($data.lng)}>Ir</button>

<div class="grid grid-cols-2 gap-4">
  <Input bind:value={$data.lat} variant="" label="Latitud" />
  <Input bind:value={$data.lng} variant="warning" label="Longitud" />
</div>
{JSON.stringify(latlng)}
<Mapa bind:latlng={latlng} />
