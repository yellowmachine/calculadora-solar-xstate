<script>
    //import Dropzone from "svelte-file-dropzone";
    import { csv2mapa, mapacsv2array } from './utils';
    import vector from './fechayhoracsv'
    import {isHeader, popWhile} from './utils';
    
    let files;
    function extractFromRawCSV(raw){
    if(raw === null){
        return {header: '', tail: ''}
    }
    const lines = raw.split(/\r?\n/)
    let {header, tail} = popWhile(lines, isHeader)
    let h = header.join("\n")
    tail = [...tail.slice(0, 5), "...", ...tail.slice(-5)].join("\n")
    return {header: h, tail}
    }
  
    let content;
    export let data;

    function handleFilesSelect(file) {
      console.log('El fichero que se va a calcular es', file);
      const reader = new FileReader();
  
      reader.onload = (evload) => {
          const raw = evload.target.result;
          content = raw;
          const mapa = csv2mapa(raw);
          const arr = mapacsv2array(mapa, vector);
          data = arr;
      }
      reader.readAsText(file);
    }

  $: if(files && files[0]) handleFilesSelect(files[0])
  </script>
  
  <!--<Dropzone on:drop={handleFilesSelect} />-->
  <input type="file" class="btn" bind:files>

  {#if files && files[0]}
    <p>
      {files[0].name}
    </p>
  {/if}

  <div>
    <pre>{content.header}</pre>
    <pre>{content.tail}</pre>
  </div>
