import { derived } from 'svelte/store';
import data from './r'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

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

function prependColumn(matrix, column){
  return matrix.map(function(row, i){
    row.unshift(column[i])
    return row
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

function pairToXY(pair){
    return pair.map(([x, y]) => ({x, y}))
}

export const analisisPotenciaEstimadaDemandada = derived(data, $data => round_matrix($data.analisis_potencia_estimada_demandada, 3));
export const onlySolar = derived(analisisPotenciaEstimadaDemandada, $data => pairToXY(prependColumn($data, months)))
export const rentedPower = derived(data, $data => pairToXY(prependColumn(new Array(12).fill($data.power))))

