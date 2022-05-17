import { buffer, switchMap, from, interval, NEVER, Subject, debounceTime, skip } from 'rxjs';
import { writable } from 'svelte/store';
import { onDestroy } from 'svelte';

const T = 2000;

export const radiation = writable({});
export const isFetchingRadiation = writable(false);

export async function getRadiation(latlng){
    try{
        isFetchingRadiation.set(true)
        radiation.set({a: 3})
    }catch{

    }
    finally{
        isFetchingRadiation.set(false)
    }
}

export function debounceRadiation(){
    const stream = new Subject()
    
    const subscription = stream.pipe(
      skip(1),
      debounceTime(T),
      switchMap((x) => from(getRadiation({})))
    ).subscribe({
      next: (v) => console.log(`observer: ${JSON.stringify(v)}`),
      complete: (v) => console.log('complete'),
      error: (err) => console.log(err)
    });	

    onDestroy(() => subscription.unsubscribe());

    return stream
}