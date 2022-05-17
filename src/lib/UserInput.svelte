<script>
import {radiation} from './radiation'
import { createForm } from 'felte';
import Grouper from './Grouper.svelte'
import VStack from './VStack.svelte'
import HStack from './HStack.svelte'
import Input from './FInput.svelte';
import SelectInput from './SelectInput.svelte';
import CheckInput from './CheckInput.svelte';
import { validator } from '@felte/validator-vest';
import suite from './suite.UserInput';

export let deep;
export let width;

const optstypeyearconsume = [{value: 0, description: "verano"}]
const optstypedayconsume = [{value: 0, description: "mañana"}]

const { form, data } = createForm({
    extend: validator({ suite }), 
    onSubmit: (values) => {
        console.log(deep, width)
        console.log(values)
    },
})

function canCalculate(){
    return $radiation && !$radiation.error
}

function errorsByKeys(keys){
    const result = suite($data)
    console.log(result)
    return keys.map(k => result.hasErrors(k))
}

</script>

<form use:form>

<Grouper label={"Consumo"} errors={errorsByKeys(['yearconsume'])}>
    <HStack>
        <VStack>
            <CheckInput name="ree" label="Perfil oficial ree" />
            <Input name="yearconsume" label="Consumo anual" variant="" />
            <SelectInput name="typeyearconsume" label="Tipo de consumo anual" options={optstypeyearconsume} />
            <SelectInput name="typedayconsume" label="Tipo de consumo diario" options={optstypedayconsume} />
        </VStack>
        <div>
            Consume File Input ...
        </div>
    </HStack>
    <HStack></HStack>
</Grouper>

{#if canCalculate()}
    <button class="btn btn-active btn-secondary" type="submit">Calcular</button>
{:else}
    <button disabled class="btn btn-active btn-accent" type="submit">Calculando radiación</button>
{/if}
</form>