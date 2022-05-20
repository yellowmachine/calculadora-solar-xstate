import { derived } from 'svelte/store';
import data from './r'

//const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export function make_matrix_with_columns(columns){
  let ret = [];
  for(let i=0; i<columns[0].length; i++){
    ret.push(columns.map(c=>c[i]));
  }  
  return ret;
}

function round_matrix(mx, d){
  return mx.map((row)=>round_array(row, d));
}

function round_array(arr, d){
  return arr.map(function(x){
    if(x === null){
      return null
    }else{
      return x.toFixed(d)
    }
  })
}

function percentColumn(matrix, numColumn){
  return matrix.map(function(row){
    let v = row[numColumn]
    if(v !== null){
      row[numColumn] = v*100 + '%'
    }
    return row
  })
}

function get_column_as_vector(mx, index){
  return mx.map(row=>row[index])
}

function pairToXY(a, b){
    return a.map(function(e, i) {
        return {y: e, x: b[i]}
    });
}

function monthLineSerie(data){
    return pairToXY(data, months.map(x => x + 0.5))
}

function monthBarSerie(data){
    return pairToXY(data, months)
}

export const analisisPotenciaEstimadaDemandada = derived(data, $data => round_matrix($data.analisis_potencia_estimada_demandada, 3));
export const onlySolar = derived(analisisPotenciaEstimadaDemandada, $data => monthLineSerie(get_column_as_vector($data, 1)))
export const rentedPower = derived(data, $data => monthLineSerie(new Array(13).fill($data.power)))
export const solarAndBattery = derived(analisisPotenciaEstimadaDemandada, $data => monthLineSerie(get_column_as_vector($data, 2)))
export const maxActualPower = derived(analisisPotenciaEstimadaDemandada, $data => monthBarSerie(get_column_as_vector($data, 0)))
export const heatmap1 = derived(data, $data => round_matrix($data.heatmap1, 3))

export const billingSummarySelectedColumns = derived(data, $data => {
  let d = round_matrix($data.billing_summary, 2);
  let column0 = get_column_as_vector(d, 0);
  let column4 = get_column_as_vector(d, 4);
  let column5 = get_column_as_vector(d, 5);
  let column6 = get_column_as_vector(d, 6);
  let column10 = get_column_as_vector(d, 10);
  let column11 = get_column_as_vector(d, 11);
  let column12 = get_column_as_vector(d, 12);
  return make_matrix_with_columns([column0, column4, column5, column6, column10, column11, column12]);
})
/*= atom((get)=>{
  let data = round_matrix(get(billingSummaryAtom), 2);
  
  return prependColumn(data, [...months, 'Total']);
});
*/