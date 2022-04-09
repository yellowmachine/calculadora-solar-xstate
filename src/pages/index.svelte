<script>  
  import Mapa from '../lib/Mapa.svelte'
  import Input from '../lib/Input.svelte'
  let lat = 1.364917;
  let lng = 103.822872;
  let latlng={lat, lng}

  function isLatitude(v){
    return true
  }

  function isLongitude(v){
    return true
  }

  $: lat = latlng.lat
  $: lng = latlng.lng
  //$: if(isLatitude(lat) && isLongitude(lng)) latlng = {lat, lng}
  
</script>

<button on:click={()=>latlng = {lat, lng}} class="btn btn-warning">Ir</button>
<Input bind:value={lat} variant="" label="Latitud" />
<Input bind:value={lng} variant="warning" label="Longitud" />
{JSON.stringify(latlng)}
<Mapa bind:latlng={latlng} />
