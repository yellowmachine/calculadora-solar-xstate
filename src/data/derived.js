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
export const rentedPower = derived(data, $data => monthBarSerie(new Array(13).fill($data.power)))

