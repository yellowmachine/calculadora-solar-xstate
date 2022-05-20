<script>
  import AnalisisPotenciaEstimadaDemandada from "../lib/AnalisisPotenciaEstimadaDemandada.svelte";
  import HeatMap from "../lib/HeatMap.svelte";
  import { heatmap1 } from "../data/derived";
  import Table from "../lib/RTable.svelte";
  import { billingSummarySelectedColumns } from "../data/derived";
</script>

<AnalisisPotenciaEstimadaDemandada />
<HeatMap data={heatmap1} />
<Table data={billingSummarySelectedColumns} headers={[]} />