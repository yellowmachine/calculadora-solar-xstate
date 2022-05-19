<script>
    import { LayerCake, Svg } from 'layercake';
    //import Scatter from '../lib/Scatter.svelte';
    import AxisX from '../lib/AxisX.svelte';
    import AxisY from '../lib/AxisY.svelte';
    import Line from '../lib/Line.svelte';
  
    const points = [
      {x: 0, y: 0},
      {x: 5, y: 10},
      {x: 10, y: 20},
      {x: 15, y: 10},
      {x: 20, y: 0}
    ];
  </script>

<style>
    .chart-container {
      width: 100%;
      height: 300px;
    }
</style>
  
<div class="chart-container">
    <LayerCake
      x='x'
      y='y'
      data={ points }
    >
      <Svg>
        <Line />
        <AxisX />
        <AxisY />
      </Svg>
    </LayerCake>
  </div>