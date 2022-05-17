import { writable } from 'svelte/store';

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