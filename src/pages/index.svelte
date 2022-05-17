<script>  
  import Mapa from '../lib/Mapa.svelte'
  import Input from '../lib/Input.svelte'
  import data from '../lib/form.js'
  import axios from 'axios'
  import {debounceRadiation, radiation} from '../lib/radiation'
  import UserInput from '../lib/UserInput.svelte'

  let latlng={lat: $data.lat, lng: $data.lng}
  let azimut = 0.0;
  let angle = 0.0;
  let stream = debounceRadiation()

  function isLatitude(v){
    return -90.0 <= v && v <= 90.0
  }

  function isLongitude(v){
    return -180.0 <= v && v <= 180.0
  }

  function isAngle(v){
    return true
  }

  function isAzimut(v){
    return true
  }

  function handleGo(){
    if(isLatitude($data.lat) && isLongitude($data.lng))
      latlng = {lat: $data.lat, lng: $data.lng}
  }

  async function handleCors(){
    const response = await axios.post("http://localhost:8000/jsonpayload", {a: 5.3})
    //const response = await axios.post("http://oracle.devme.fun/jsonpayload", {a: 5.3})    
    console.log(response)
  }

  $: $data.lat = latlng.lat
  $: $data.lng = latlng.lng

  $: {
    const {lat, lng} = latlng
    if(isLatitude(lat) && isLongitude(lng) && isAzimut(azimut) && isAngle(angle))
      stream.next({lat, lng, azimut, angle})
  }

  $: console.log("Radiation after debounce and switchMap", radiation)
  
</script>

<button on:click={handleCors} class="btn btn-warning">make a cors request</button>

<div class="flex flex-row py-2">
    <div class="basis-2/5">
      <Input bind:value={$data.lat} variant="" label="Latitud">
          My tooltip
      </Input>
    </div>
    <div class="basis-1/5">
      <button on:click={handleGo} class="btn btn-warning" disabled={!isLatitude($data.lat) || !isLongitude($data.lng)}>Ir</button>
    </div>
    <div class="basis-2/5">
      <Input bind:value={$data.lng} variant="warning" label="Longitud" />
    </div>
</div>
<div class="flex flex-row py-2">
  <div class="basis-2/5">
    <Input bind:value={azimut} variant="" label="Azimut">
      My tooltip
    </Input>
  </div>
  <div class="basis-1/5">
  </div>
  <div class="basis-2/5">
    <Input bind:value={angle} variant="" label="Ángulo">
      My tooltip
    </Input>
  </div>
</div>

<Mapa bind:latlng={latlng} />

<UserInput />