<script>
import {radiation} from './radiation'
import { createForm } from 'felte';
import Grouper from './Grouper.svelte'
import VStack from 'src/lib/VStack.svelte'
import HStack from 'src/lib/HStack.svelte'

export let deep;
export let width;

const { form } = createForm({
    onSubmit: (values) => {
        console.log(deep, width)
        console.log(values)
    },
})

function canCalculate(){
    return $radiation && !$radiation.error
}

</script>

<form use:form>

<Grouper label={"Consumo"}>
    <VStack>
        <HStack></HStack>
        <HStack></HStack>
    </VStack>
</Grouper>

{#if canCalculate()}
    <button class="btn btn-active btn-secondary" type="submit">Calcular</button>
{:else}
    <button disabled class="btn btn-active btn-accent" type="submit">Calculando radiación</button>
{/if}
</form>