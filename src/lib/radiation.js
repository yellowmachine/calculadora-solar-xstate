import { switchMap, from, tap, Subject, debounceTime, skip } from 'rxjs';
import { writable } from 'svelte/store';
import { onDestroy } from 'svelte';
import axios from 'axios';

const T = 2000;

export const radiation = writable({});

export async function getRadiation({lat, lng, azimut, angle}){
    try{
        const {data} = await axios.get(`/api/radiation?lat=${lat}&lng=${lng}&azimut=${azimut}&angle=${angle}`)
        return data
    }catch(error){
        console.log(error)
        return {error: true}
    }
    finally{
        
    }
}

export function debounceRadiation(){
    const stream = new Subject()
    
    const subscription = stream.pipe(
      skip(1),
      debounceTime(T),
      switchMap((x) => {
          radiation.set(null)
          return from(getRadiation(x)) 
      }),
      tap(x => {
        radiation.set(x)
      })
    ).subscribe({
      next: (v) => console.log(`observer: ${JSON.stringify(v)}`),
      complete: (v) => console.log('complete'),
      error: (err) => console.log(err)
    });	

    onDestroy(() => subscription.unsubscribe());

    return stream
}