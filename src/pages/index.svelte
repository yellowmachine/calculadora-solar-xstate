<script>  
  import Mapa from '../lib/Mapa.svelte'
  let lat = 1.364917;
  let lng = 103.822872;
  let latlng={lat, lng}

  function isLatitude(v){
    return true
  }

  function isLongitude(v){
    return true
  }

  $: if(isLatitude(lat) && isLongitude(lng)) latlng = {lat, lng}
</script>

<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">
    Latitud
  </label>
  <input bind:value={lat} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="text" placeholder="Latitud">
</div>
<div class="mb-4">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">
    Longitud
  </label>
  <input bind:value={lng} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="longitude" type="text" placeholder="Longitud">
</div>
{JSON.stringify(latlng)}
<Mapa bind:latlng={latlng} />
