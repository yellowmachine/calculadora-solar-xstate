<script>
  import 'leaflet/dist/leaflet.css'
  import {LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';
import { handle_promise } from 'svelte/internal';

  const mapOptions = {
      center: [1.364917, 103.822872],
      zoom: 11,
  };
  let MAP_EL;
  let latlng;

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tileLayerOptions = {
      minZoom: 0,
      maxZoom: 20,
      maxNativeZoom: 19,
      attribution: "© OpenStreetMap contributors",
  };
  $: {
    if(MAP_EL && latlng){
      let map = MAP_EL.getMap();
      map.panTo(latlng)
    }    
  }
</script>

<div class="example">
  <LeafletMap bind:this={MAP_EL} events={['click']}  on:click={(ev) => latlng = ev.detail.latlng} options={mapOptions}>
      <TileLayer url={tileUrl} options={tileLayerOptions}/>
  </LeafletMap>
</div>

<style>
  .example{
    height: 500px;
  }
</style>