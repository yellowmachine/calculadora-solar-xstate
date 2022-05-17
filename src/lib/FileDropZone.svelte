<script>
    import Dropzone from "svelte-file-dropzone";
    import { csv2mapa, mapacsv2array } from './utils';
    import vector from './fechayhoracsv'
    import {isHeader, popWhile} from './utils';

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
  
    let files = {
      accepted: [],
      rejected: []
    };
  
    let content;
    export let data;

    function handleFilesSelect(e) {
      const { acceptedFiles, fileRejections } = e.detail;
      files.accepted = [...files.accepted, ...acceptedFiles];
      files.rejected = [...files.rejected, ...fileRejections];

      console.log('El fichero que se va a calcular es', files.accepted[0]);
      const reader = new FileReader();
  
      reader.onload = (evload) => {
          const raw = evload.target.result;
          content = raw;
          const mapa = csv2mapa(raw);
          const arr = mapacsv2array(mapa, vector);
          data = arr;
      }
      reader.readAsText(files.accepted[0]);

    }
  </script>
  
  <Dropzone on:drop={handleFilesSelect} />
  <ol>
    {#each files.accepted as item}
      <li>{item.name}</li>
    {/each}
  </ol>
  <div>
    <pre>{content.header}</pre>
    <pre>{content.tail}</pre>
  </div>
