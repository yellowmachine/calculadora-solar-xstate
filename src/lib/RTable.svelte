<script>
    export let data;
    export let headers;

    if(headers[0].constructor !== Array){
        headers = [headers]
    }
    headers = headers.map(row=>{
        return row.map((x)=>{
        if(x.constructor === Object){
            return x
        }
        return {colspan: 1, label: x}
        })    
    })

</script>

<table class="styled-table">
    <thead>
        {#each headers as header, i (i)}
            <tr>
                {#each header as header, m (m)}
                    <th colspan={header.colspan}>{header.label}</th>
                {/each}
            </tr>
        {/each}
    </thead>
    <tbody>
        {#each data as rows, i (i)}
            <tr>
                {#each rows as col, j (j)}
                    <td>
                        {col}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  
  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
  }
  
  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
    border-left: 2px solid white;
  }
  
  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  
  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  
  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  
  .styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }
</style>