<script>
    import { LayerCake, Svg } from 'layercake';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
    import Line from './Line.svelte';
    import Bar from './Bar.svelte';
    import { onlySolar, rentedPower } from '../data/derived';
  
    const data = {
        onlySolar: $onlySolar,
        rentedPower: $rentedPower
    }

    $: flatData = [...$onlySolar, ...$rentedPower]
  </script>

<div class='header'>
    <h1 class='title'>Potencia Máxima Demandada</h1>
</div>

<div class="chart-container">
    <LayerCake
      x='x'
      y='y'
      { data }
      { flatData }
    >
      <Svg>
        <Bar dataset="rentedPower" stroke="#804793FF" />
        <Line dataset="onlySolar" stroke="#FF6961" />
        <AxisX />
        <AxisY />
      </Svg>
    </LayerCake>
  </div>

<style>
    .chart-container {
      width: 100%;
      height: 300px;
    }
</style>

