<script>
    import { LayerCake, Svg } from 'layercake';
    import Scatter from '../lib/Scatter.svelte';
    import AxisX from '../lib/AxisX.svelte';
    import AxisY from '../lib/AxisY.svelte';
  
    const points = [
      {x: 0, y: 0},
      {x: 5, y: 10},
      {x: 10, y: 20},
      {x: 15, y: 30},
      {x: 20, y: 40}
    ];
  </script>

<style>
    /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
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
        <!-- You can expose properties on your chart components to make them more reusable -->
        <Scatter fill={'blue'} r={3} />
        <AxisX />
        <AxisY />
      </Svg>
    </LayerCake>
  </div>