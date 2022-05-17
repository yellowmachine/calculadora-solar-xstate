import { derived, get } from 'svelte/store';

export default function(a, t){
	return derived(a, ($a, set) => {
        const v = {...get(a)}
        let timeoutId = setTimeout(() => set(v), t);
		return () => clearTimeout(timeoutId) 
	});
}