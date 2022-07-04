<script lang="ts">
  /*import { Router } from '@roxi/routify'
  import { routes } from '../.routify/routes'
  */
  import ReloadPrompt from './lib/ReloadPrompt.svelte'
  // replaced dyanmicaly
  const date = '__DATE__'

  import m from './machine';
  import { useMachine } from '@xstate/svelte';
  import { matchesState } from 'xstate';
  import Home from './pages/home.svelte'

  const {state, send} = useMachine(m);

</script>

<main>
  <img src="/favicon.svg" alt="PWA Logo" width="60" height="60"/>

  {#if matchesState('home', state)}
    <Home {send} {state} />
  {/if}

</main>

<!--
  <Router {routes} />
-->

<ReloadPrompt />
