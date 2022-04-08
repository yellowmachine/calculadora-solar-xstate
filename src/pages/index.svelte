<script>  
  import Mapa from '../lib/Mapa.svelte'
  let latlng={lat: 1.364917, lng: 103.822872,}
</script>

<Mapa bind:latlng={latlng} />
