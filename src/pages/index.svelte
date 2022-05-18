<script>  
  import Mapa from '../lib/Mapa.svelte'
  import Input from '../lib/Input.svelte'
  import data from '../lib/form.js'
  import axios from 'axios'
  import {debounceRadiation, radiation} from '../lib/radiation'
  import UserInput from '../lib/UserInput.svelte'
  import HStack from '../lib/HStack.svelte'

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

  async function handleCalculate(){
    const response = await axios.post("/api/calculate", {a: 5.3})
    //const response = await axios.post("http://localhost:8000/jsonpayload", {a: 5.3})
    //const response = await axios.post("http://oracle.devme.fun/jsonpayload", {a: 5.3})    
    console.log(response)
  }

  $: $data.lat = latlng.lat
  $: $data.lng = latlng.lng

  $: {
    const {lat, lng} = latlng
    if(isLatitude(lat) && isLongitude(lng) && isAzimut(azimut) && isAngle(angle)){
      console.log("stream.next({lat, lng, azimut, angle})", lat, lng, azimut, angle)
      stream.next({lat, lng, azimut, angle})
    }
  }

  $: console.log("Radiation after debounce and switchMap", radiation)
  
</script>

<button on:click={handleCalculate} class="btn btn-warning">make a cors request</button>

<div class="grid grid-cols-1 place-items-center">
  <a href="/cake" class="link">Ir a Layer Cake example</a>

  <HStack>
    <div>
      <Input bind:value={$data.lat} variant="" label="Latitud">
          My tooltip
      </Input>
    </div>
    <div>
      <button on:click={handleGo} class="btn btn-warning" disabled={!isLatitude($data.lat) || !isLongitude($data.lng)}>Ir</button>
    </div>
    <div>
      <Input bind:value={$data.lng} variant="warning" label="Longitud" />
    </div>
  </HStack>

  <HStack>
    <UserInput bind:azimut bind:angle>
      <Mapa bind:latlng />
    </UserInput>
  </HStack>

</div>