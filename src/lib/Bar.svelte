<!--
  @component
  Generates an SVG column chart.
 -->
 <script>
    import { getContext } from 'svelte';
  
    let { data, xGet, yGet, yRange, xScale } = getContext('LayerCake');
    export let dataset;

    console.log($data[dataset])

    $: columnWidth = d => {
      const vals = $xGet({x: 2});
      return vals;
      return Math.max(0, (vals[1] - vals[0]));
    };
  
    $: columnHeight = d => {
      return $yRange[0] - $yGet(d);
    };
  
    /** @type {String} [fill='#00e047'] - The shape's fill color. */
    export let fill = '#00e047';
  
    /** @type {String} [stroke='#000'] - The shape's stroke color. */
    export let stroke = '#000';
  
    /** @type {Number} [strokeWidth=0] - The shape's stroke width. */
    export let strokeWidth = 0;
  

  </script>
  
  <g class="column-group">
    {#each $data[dataset] as d, i}
      <rect
        class='group-rect'
        data-id="{i}"
        x="{$xGet(d)}"
        y="{$yGet(d)}"
        width="{columnWidth({x: 2})}"
        height="{columnHeight(d)}"
        {fill}
        {stroke}
        stroke-width="{strokeWidth}"
      />
    {/each}
  </g>