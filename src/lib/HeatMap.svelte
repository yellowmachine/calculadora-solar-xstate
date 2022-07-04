<script>
import interpolate from 'color-interpolate';

export let data;

const flatten = [].concat(...data);
const min = Math.min(...flatten);
const max = Math.max(...flatten);

const xLabels = ['Enero', 'Febrero', 'Marzo', 'Abril',
                'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const yLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

let colormap = interpolate(['rgb(123, 239, 178)', 'rgb(245, 215, 110)', 'rgb(240, 52, 52)']);

function bc(value){
    const i = (value - min)/(max - min)
    if(i) 
        return colormap(i)
    else 
        return colormap(0)
}

</script>

<div>
    {#each yLabels as row, i}
        {#each xLabels as col, j}
            <div style={`color: white; background-color: ${bc(data[i][j])}`}>
                {data[i][j]}
            </div>
        {/each}
    {/each}
</div>
