<script>
import {radiation} from './radiation'
import { createForm } from 'felte';
import Grouper from './Grouper.svelte'
import VStack from './VStack.svelte'
import HStack from './HStack.svelte'
import Input from './FInput.svelte';
import SelectInput from './SelectInput.svelte';
import CheckInput from './CheckInput.svelte';
import FileDropZone from './FileDropZone.svelte';
import { validator } from '@felte/validator-vest';
import suite from './suite.UserInput';

export let deep;
export let width;

let csv;

const optstypeyearconsume = [{value: 1, description: 'Mayor en verano'},
                              {value: 2, description: 'Mayor en invierno'},
                              {value: 3, description: 'Igual durante el año'}]
const optstypedayconsume = [{value: 1, description: "Tarde"},
                            {value: 2, description: "Noche"},
                            {value: 3, description: "Igual"}]
const optsbonopercentage = [{value: 0, description: 'Bono25%'}, 
                            {value: 1, description: 'Bono40%'}]

const { form, data } = createForm({
    extend: validator({ suite }), 
    onSubmit: (values) => {
        console.log(deep, width)
        //console.log(csv)
        console.log(values)
    },
})

function canCalculate(){
    return $radiation && !$radiation.error && suite($data).isValid() //check usecsv and file ok!
}

function errorsByKeys(keys){
    const result = suite($data)
    console.log(result)
    return keys.map(k => result.hasErrors(k))
}

</script>

<form use:form>

<Grouper label={"Consumo"} errors={errorsByKeys(['yearconsume'])}>
    <VStack>
        <HStack>
            <CheckInput name="usecsv" label="Consumo real o aproximado" />
        </HStack>
        <HStack>
            <VStack>
                <CheckInput name="ree" label="Perfil oficial ree" />
                <Input name="yearconsume" label="Consumo anual" variant="" />
                <SelectInput name="typeyearconsume" label="Tipo de consumo anual" options={optstypeyearconsume} />
                <SelectInput name="typedayconsume" label="Tipo de consumo diario" options={optstypedayconsume} />
            </VStack>
            <div>
                <FileDropZone bind:data={csv} />
            </div>
        </HStack>
    </VStack>
</Grouper>

<Grouper label={"Tarifa"} errors={errorsByKeys(['power', 'powerrentedvalle', 'fixedrate', 'fixedvalle', 'vallerate', 'vallellano', 'picorate'])}>
    <HStack>
        <Input name="power" label="Potencia contratada kW" variant="" />
        <Input name="powerrentedvalle" label="Potencia contratada valle (kW) 2.0TD" variant="" />
      </HStack>
      <HStack>
        <Input name="fixedrate" label="Tarifa de término fijo pico €" variant="" />
        <Input name="fixedvalle" label="Tarifa de termino fijo valle €" variant="" />
      </HStack>
      <HStack>
        <Input name="vallerate" label="Tarifa de energía valle €" variant="" />
        <Input name="vallellano" label="Tarifa energía llano (€/kWh)" variant="" />
        <Input name="picorate" label="Tarifa de energía pico €" variant="" />
      </HStack>
      <HStack>
        <CheckInput name="rented" label="Alquiler contador" />
        <CheckInput name="socialb" label="Bono Social" />
      </HStack>
      <HStack>
        <SelectInput name="bonopercentage" label="Bono social porcentaje" options={optsbonopercentage} />
        <Input name="otherconcepts" label="Otros conceptos" variant="" />
      </HStack>     
</Grouper>

<Grouper label={"Paneles"} errors={errorsByKeys(['numpanels', 'panelpower', 'batterycapacity', 'inversorpower'])}>
    <HStack>
      <Input name="numpanels" label="Número de paneles" variant="" />
      <Input name="panelpower" label="Potencia del panel (Wp)" variant="" />
    </HStack>     
    <HStack>
      <Input name="batterycapacity" label="Capacidad de la batería" variant="" defaultValue={0} />
      <Input name="inversorpower" label="Potencia del inversor" variant="" />
    </HStack>     
</Grouper>

<Grouper label="Coche eléctrico" errors={errorsByKeys(['carannualkm', 'electriccarpower', 'carefficiency'])} >
    <HStack>
      <Input name="carannualkm" label="" variant="" />
      <Input name="electriccarpower" label="" variant="" />            
    </HStack>     
    <HStack>
      <Input name="carefficiency" label="" variant="" />
    </HStack>     
</Grouper>

{#if canCalculate()}
    <button class="btn btn-active btn-secondary" type="submit">Calcular</button>
{:else}
    <button disabled class="btn btn-active btn-accent" type="submit">Calculando radiación</button>
{/if}
</form>