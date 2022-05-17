import { switchMap, from, tap, Subject, debounceTime, skip } from 'rxjs';
import { writable } from 'svelte/store';
import { onDestroy } from 'svelte';

const T = 2000;

export const radiation = writable({});

export async function getRadiation(latlng){
    try{
        console.log('Fetch radiation:', latlng)
        return {a: 3}
    }catch(error){
        return {error}
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
          if(x.error){
            //set error
          }else{
            radiation.set(x)
          }
      })
    ).subscribe({
      next: (v) => console.log(`observer: ${JSON.stringify(v)}`),
      complete: (v) => console.log('complete'),
      error: (err) => console.log(err)
    });	

    onDestroy(() => subscription.unsubscribe());

    return stream
}