<script>
    import { LayerCake, Svg } from 'layercake';
    import AxisX from './AxisX.svelte';
    import AxisY from './AxisY.svelte';
    import Line from './Line.svelte';
    import Bar from './Bar.svelte';
    import { onlySolar, rentedPower, solarAndBattery, maxActualPower } from '../data/derived';
  
    const data = {
        onlySolar: $onlySolar,
        rentedPower: $rentedPower,
        solarAndBattery: $solarAndBattery,
        maxActualPower: $maxActualPower
    }

    $: flatData = [...$onlySolar, ...$rentedPower, ...$solarAndBattery, ...$maxActualPower]
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
        <Bar dataset="maxActualPower" stroke="#804793FF" />
        <Line dataset="rentedPower" stroke="#FFB347" />
        <Line dataset="onlySolar" stroke="#FF6961" />
        <Line dataset="solarAndBattery" stroke="#808080" />
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

